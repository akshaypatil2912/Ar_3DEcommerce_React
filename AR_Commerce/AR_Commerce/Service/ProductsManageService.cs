
using AR_Commerce.Model;
using AR_Commerce.Repository;
using LIbFiles;
using System.Data;

namespace AR_Commerce.Service
{
    public class ProductsManageService
    {
        public readonly ProductsManageRepository _productsmanagerepository;
        private readonly JwtSettings _jwtSettings;
        private readonly IConfiguration _configuration;
        public ProductsManageService(ProductsManageRepository productsmanagerepository,
            JwtSettings jwtSettings, IConfiguration configuration)
        {
            _productsmanagerepository = productsmanagerepository;
            _jwtSettings = jwtSettings;
            _configuration = configuration;
        }
        public DataTable GetAllProducts()
        {
            var connectionstring = _configuration.GetConnectionString("DefaultConnection");
            var products = _productsmanagerepository.GetAllProducts(connectionstring);

            return products;
        }

        public String AddToCartForUser(CartInfo model)
        {
            var connectionstring = _configuration.GetConnectionString("DefaultConnection");
            var products = _productsmanagerepository.AddToCartForUser(connectionstring,model);

            return products;
        }

        public DataTable GetCartDetailsForUser(String UserId)
        {
            var connectionstring = _configuration.GetConnectionString("DefaultConnection");
            var products = _productsmanagerepository.GetCartDetailsForUser(connectionstring, UserId);

            return products;
        }

        public String RemoveProductFromCartForUser(CartInfo model)
        {
            var connectionstring = _configuration.GetConnectionString("DefaultConnection");
            var products = _productsmanagerepository.RemoveProductFromCartForUser(connectionstring, model);

            return products;
        }
    }
}
