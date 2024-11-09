namespace AR_AuthorizationUser.Model
{
    public class UserInfo
    {
        public int? UserId { get; set; }
        public string? UserName { get; set; }
        public string? Email { get; set; }
        public string? Password { get; set; }
        public string PhoneNo { get;  set; }
        public string Address { get;  set; }
        public string City { get;  set; }
        public string State { get;  set; }
        public string PinCode { get; set; }
    }

    public class UserLogin
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }


}
