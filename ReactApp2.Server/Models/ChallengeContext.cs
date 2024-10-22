using Microsoft.EntityFrameworkCore;

namespace ReactApp2.Server.Models;

public class ChallengeContext : DbContext
{
    public ChallengeContext(DbContextOptions<ChallengeContext> options)
        : base(options)
    {
    }

    public DbSet<Challenge> Challenges { get; set; } = null!;
}