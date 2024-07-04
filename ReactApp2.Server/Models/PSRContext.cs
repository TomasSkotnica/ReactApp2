using Microsoft.EntityFrameworkCore;

namespace ReactApp2.Server.Models;

public class PSRContext : DbContext
{
    public PSRContext(DbContextOptions<PSRContext> options)
        : base(options)
    {
    }

    public DbSet<PSRitem> PSRitems { get; set; } = null!;
}
