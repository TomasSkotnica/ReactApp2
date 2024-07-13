using Microsoft.EntityFrameworkCore;

namespace ReactApp2.Server.Models;
public class ContactContext : DbContext
{
    public ContactContext(DbContextOptions<ContactContext> options)
        : base(options) 
    {
    }

    public DbSet<Contact> Contacts { get; set; } = null!; // new DbSet<Contact>();
}