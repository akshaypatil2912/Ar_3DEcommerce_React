using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace AR_AuthorizationUser.Model
{
    public class DatabaseContext :DbContext
    {
        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options) { }

        public DbSet<UserInfo> Users { get; set; }
    }
}
