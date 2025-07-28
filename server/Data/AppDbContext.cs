using Microsoft.EntityFrameworkCore;
using Server.Models;

namespace Server.Data
{
  public class AppDbContext : DbContext
  {
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Contact> Contacts { get; set; } // Tabela de contatos

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
      base.OnModelCreating(modelBuilder);

      // Configurações adicionais (opcional)
      modelBuilder.Entity<Contact>(entity =>
      {
        entity.Property(c => c.FirstName).IsRequired().HasMaxLength(100);
        entity.Property(c => c.LastName).IsRequired().HasMaxLength(100);
        entity.Property(c => c.Email).HasMaxLength(255);
        entity.Property(c => c.Phone).HasMaxLength(20);
        entity.Property(c => c.Company).HasMaxLength(100);
        entity.Property(c => c.JobTitle).HasMaxLength(100);
        entity.Property(c => c.Notes).HasMaxLength(500);
      });
    }
  }
}