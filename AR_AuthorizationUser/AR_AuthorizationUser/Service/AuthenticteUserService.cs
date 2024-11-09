using AR_AuthorizationUser.Model;
using AR_AuthorizationUser.Repository;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Reflection.PortableExecutable;

namespace AR_AuthorizationUser.Service
{
    public class AuthenticteUserService
    {
        private readonly AuthenticteUserRepository _authenticteuserrepository;
        private readonly JwtSettings _jwtSettings;
        private readonly IConfiguration _configuration;
        public AuthenticteUserService(JwtSettings jwtSettings, IConfiguration configuration
            , AuthenticteUserRepository authenticteuserrepository)
        {
            _jwtSettings = jwtSettings;
            _configuration = configuration;
            _authenticteuserrepository = authenticteuserrepository;
        }
        public UserInfo ValidateUser(string username,string password)
        {
            UserInfo? user = null;
            var connectionstring = _configuration.GetConnectionString("DefaultConnection");
            var result = _authenticteuserrepository.ValidateUser(username, password, connectionstring);
            
            if(result != null && result.Password == password)
            {
                return result;
            }
            return null;
        }

        public string RegisterUser(UserInfo model)
        {
            var connectionstring = _configuration.GetConnectionString("DefaultConnection");
            string regmodel = _authenticteuserrepository.RegisterUser(model, connectionstring);
            return regmodel;
        }

        public string UpdateUserDetails(UserInfo model)
        {
            var connectionstring = _configuration.GetConnectionString("DefaultConnection");
            string regmodel = _authenticteuserrepository.UpdateUserDetails(model, connectionstring);
            return regmodel;
        }

        public DataTable GetUserDetails(string userName)
        {
            var connectionstring = _configuration.GetConnectionString("DefaultConnection");
            var regmodel = _authenticteuserrepository.GetUserDetails(userName, connectionstring);
            return regmodel;
        }
    }
}
