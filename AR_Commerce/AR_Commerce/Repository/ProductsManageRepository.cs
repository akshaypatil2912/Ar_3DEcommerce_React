using AR_AuthorizationUser.Model;
using AR_Commerce.Model;
using MySql.Data.MySqlClient;
using System.Data;

namespace AR_Commerce.Repository
{
    public class ProductsManageRepository
    {
        public DataTable GetAllProducts(string connectionstring)
        {
            DataTable products = new DataTable();
            using var connection = new MySqlConnection(connectionstring);
            connection.Open();

            using var command = new MySqlCommand("sp_GetAllProductsDetail", connection)
            {
                CommandType = CommandType.StoredProcedure
            };

            using var adapter = new MySqlDataAdapter(command);
            adapter.Fill(products); 

            return products; 
        }

        public String AddToCartForUser(string connectionstring, CartInfo model)
        {
            var resultmsg = "";
            using var connection = new MySqlConnection(connectionstring);
            connection.Open();

            using var command = new MySqlCommand("sp_AddToCartForUser", connection)
            {
                CommandType = CommandType.StoredProcedure
            };
            command.Parameters.AddWithValue("ip_UserId", model.UserId);
            command.Parameters.AddWithValue("ip_UserName", model.UserName);
            command.Parameters.AddWithValue("ip_ProductId", model.ProductId);

            var result = command.ExecuteScalar();
            if (result != null)
            {
                resultmsg = result.ToString();
            }
            return resultmsg;
        }

        public DataTable GetCartDetailsForUser(string connectionstring,string UserId)
        {
            DataTable cartdetails = new DataTable();

            using var connection = new MySqlConnection(connectionstring);
            connection.Open();

            using var command = new MySqlCommand("sp_GetCartDetailsForUser", connection)
            {
                CommandType = CommandType.StoredProcedure
            };
            command.Parameters.AddWithValue("ip_UserId", UserId);


            using var adapter = new MySqlDataAdapter(command);
            adapter.Fill(cartdetails);

            return cartdetails;
        }

        public String RemoveProductFromCartForUser(string connectionstring, CartInfo model)
        {
            var resultmsg = "";
            using var connection = new MySqlConnection(connectionstring);
            connection.Open();

            using var command = new MySqlCommand("sp_RemoveProductFromCartForUser", connection)
            {
                CommandType = CommandType.StoredProcedure
            };
            command.Parameters.AddWithValue("ip_UserId", model.UserId);
            command.Parameters.AddWithValue("ip_UserName", model.UserName);
            command.Parameters.AddWithValue("ip_ProductId", model.ProductId);

            var result = command.ExecuteScalar();
            if (result != null)
            {
                resultmsg = result.ToString();
            }
            return resultmsg;
        }
    }
}
