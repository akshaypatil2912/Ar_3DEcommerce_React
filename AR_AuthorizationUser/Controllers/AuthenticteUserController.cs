using AR_AuthorizationUser.Model;
using AR_AuthorizationUser.Service;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace AR_AuthorizationUser.Controllers
{
    public class AuthenticteUserController : Controller
    {
        private readonly JwtSettings _jwtSettings;
        private readonly IConfiguration _configuration;
        private readonly AuthenticteUserService _authenticteuserservice;

        public AuthenticteUserController(JwtSettings jwtSettings, IConfiguration configuration,
            AuthenticteUserService authenticteuserservice)
        {
            _jwtSettings = jwtSettings;
            _configuration = configuration;
            _authenticteuserservice = authenticteuserservice;
        }


        [HttpPost("login")]
        public IActionResult Login([FromBody] UserLogin userLogin)
        {
            // Validate user using stored procedure
            var user = _authenticteuserservice.ValidateUser(userLogin.Username, userLogin.Password);
            if (user == null)
                return Unauthorized("Invalid username or password");

            // Generate JWT token
            var token = GenerateJwtToken(user);
            return Ok(new { token,user , status = true });
        }

        private string GenerateJwtToken(UserInfo user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_jwtSettings.SecretKey);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                new Claim(ClaimTypes.Name, user.UserName),
                }),
                Expires = DateTime.UtcNow.AddMinutes(_jwtSettings.ExpirationMinutes),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        [HttpPost("RegisterUser")]
        public ActionResult RegisterUser([FromBody] UserInfo model)

        {
            var result = _authenticteuserservice.RegisterUser(model);
            if (result == "Exists")
            {
                return Ok(new { status = false, message = "User already exists with the provided username or email" });
            }
            else if (result == null)
            {
                return BadRequest("Some error occured");
            }
            return Ok(new { status = true, message = "User Registertion Sccessful" });
        }

        [HttpPost("UpdateUserDetails")]
        public ActionResult UpdateUserDetails([FromBody] UserInfo model)

        {
            var result = _authenticteuserservice.UpdateUserDetails(model);
           
            return Ok(new { status = true, message = "User Details Updated Sccessfully" });
        }

        [HttpGet("GetUserDetails")]
        public ActionResult GetUserDetails(string userName)

        {
            var result = _authenticteuserservice.GetUserDetails(userName);
            return Ok(JsonConvert.SerializeObject(new { result }));
        }

    }
}
