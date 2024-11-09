using AR_AuthorizationUser.Model;
using AR_Commerce.Model;
using AR_Commerce.Service;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Data;

namespace AR_Commerce.Controllers
{
    public class ProductsManageController : Controller
    {
        public readonly ProductsManageService _productsmanageservice;
        public ProductsManageController(ProductsManageService productsmanageservice)
        {
            _productsmanageservice = productsmanageservice;
        }
       
        [HttpGet("GetAllProducts")]
        public ActionResult GetAllProducts()
        {
            var products = _productsmanageservice.GetAllProducts();
            return Ok(JsonConvert.SerializeObject(new {products}));
        }

        [HttpPost("AddToCartForUser")]
        public ActionResult AddToCartForUser([FromBody] CartInfo model)
        {
            var products = _productsmanageservice.AddToCartForUser(model);
            return Ok(JsonConvert.SerializeObject(new { products }));
        }

        [HttpGet("GetCartDetailsForUser")]
        public ActionResult GetCartDetailsForUser(String UserId)
        {
            var cartdetails = _productsmanageservice.GetCartDetailsForUser(UserId);
            return Ok(JsonConvert.SerializeObject(new { cartdetails }));
        }

        [HttpPost("RemoveProductFromCartForUser")]
        public ActionResult RemoveProductFromCartForUser([FromBody] CartInfo model)
        {
            var cartdetails = _productsmanageservice.RemoveProductFromCartForUser(model);
            return Ok(JsonConvert.SerializeObject(new { cartdetails }));
        }
    }
}
