using AR_Commerce.Model;
using Microsoft.EntityFrameworkCore;

namespace AR_Commerce
{
    public class DatabaseContext :DbContext
    {
        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options) { }

        public DbSet<Products> products { get; set; }
    }
}
