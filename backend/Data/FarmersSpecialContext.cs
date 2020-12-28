using Microsoft.EntityFrameworkCore;
using FarmersSpecial.Models;

namespace FarmersSpecial.Data
{
    public class FarmersSpecialContext : DbContext
    {
        public FarmersSpecialContext (DbContextOptions<FarmersSpecialContext> options)
            : base(options)
        {
        }

        public DbSet<Product> Products { get; set; }
        public DbSet<User> Users { get; set; }

    }
}