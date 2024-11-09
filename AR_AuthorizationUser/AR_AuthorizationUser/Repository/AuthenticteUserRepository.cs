using AR_AuthorizationUser.Model;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using System.Data;

namespace AR_AuthorizationUser.Repository
{
    public class AuthenticteUserRepository
    {
        public UserInfo ValidateUser(string username, string password,string connectionstring)
        {
            UserInfo? user = null;

            using var connection = new MySqlConnection(connectionstring);
            connection.Open();

            using var command = new MySqlCommand("sp_GetUserByUserName", connection)
            {
                CommandType = CommandType.StoredProcedure
            };
            command.Parameters.AddWithValue("ip_UserName", username);

            using var reader = command.ExecuteReader();

            if (reader.Read()) 
            {
                user = new UserInfo
                {
                    UserId = reader.GetInt16("UserId"),
                    UserName = reader.GetString("UserName"),
                    Email = reader.GetString("Email"),
                    Password = reader.GetString("Password"),
                    PhoneNo = reader.GetString("PhoneNo"),              
                    Address = reader.GetString("Address"),              
                    City = reader.GetString("City"),              
                    State = reader.GetString("State"),              
                    PinCode = reader.GetString("Pincode"),              
                };
            }
            return user;
        }

        public string RegisterUser(UserInfo model, string connectionstring)
        {
            var resultmsg = "";
            using var connection = new MySqlConnection(connectionstring);
            connection.Open();

            using var command = new MySqlCommand("sp_RegisterUserDetails", connection)
            {
                CommandType = CommandType.StoredProcedure
            };
            command.Parameters.AddWithValue("ip_UserName", model.UserName);
            command.Parameters.AddWithValue("ip_Email", model.Email);
            command.Parameters.AddWithValue("ip_Password", model.Password);

            // var result = command.ExecuteNonQuery();
            var result = command.ExecuteScalar();
            if (result != null)
            {
                resultmsg = result.ToString();
            }
            return resultmsg;

        }

        public string UpdateUserDetails(UserInfo model, string connectionstring)
        {
            var resultmsg = "";
            using var connection = new MySqlConnection(connectionstring);
            connection.Open();

            using var command = new MySqlCommand("sp_UpdateUserDetails", connection)
            {
                CommandType = CommandType.StoredProcedure
            };
            command.Parameters.AddWithValue("ip_UserName", model.UserName);
            command.Parameters.AddWithValue("ip_Email", model.Email);
            command.Parameters.AddWithValue("ip_PhoneNo", model.PhoneNo);
            command.Parameters.AddWithValue("ip_City", model.City);
            command.Parameters.AddWithValue("ip_Address", model.Address);
            command.Parameters.AddWithValue("ip_PinCode", model.PinCode);
            command.Parameters.AddWithValue("ip_State", model.State);

            // var result = command.ExecuteNonQuery();
            var result = command.ExecuteScalar();
            if (result != null)
            {
                resultmsg = result.ToString();
            }
            return resultmsg;

        }

        public DataTable GetUserDetails(string userName,string connectionstring)
        {
            DataTable products = new DataTable();
            using var connection = new MySqlConnection(connectionstring);
            connection.Open();

            using var command = new MySqlCommand("sp_GetUserDetails", connection)
            {
                CommandType = CommandType.StoredProcedure
            };
            command.Parameters.AddWithValue("ip_UserName", userName);


            using var adapter = new MySqlDataAdapter(command);
            adapter.Fill(products);

            return products;
        }

    }
}
