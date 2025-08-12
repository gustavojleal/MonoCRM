using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Server.Models;
using System.Collections.Generic;
namespace Server.Data
{
  public class AppDbContext : IdentityDbContext<ApplicationUser, IdentityRole<Guid>, Guid>
  {
     public AppDbContext(DbContextOptions<AppDbContext> options): base(options) { }

    public DbSet<Deal> Deals { get; set; } 
    public DbSet<Account> Accounts { get; set; }
    public DbSet<Contact> Contacts { get; set; }
    
    public DbSet<Product> Products { get; set; }
    public DbSet<Activity> Activities { get; set; }
     public DbSet<History> Histories { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
      {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<ApplicationUser>(entity =>
        {
            entity.Property(u => u.UserName).IsRequired().HasMaxLength(256);
            entity.Property(u => u.Email).IsRequired().HasMaxLength(256);
            entity.Property(u => u.CreatedDate).HasDefaultValueSql("now()");
        });
      // Configuração de Account
        modelBuilder.Entity<Account>(entity =>
        {
          entity.Property(a => a.Name).IsRequired().HasMaxLength(100);
          entity.Property(a => a.Description).HasMaxLength(500);
          entity.Property(a => a.CreatedAt).HasDefaultValueSql("now()");
          entity.Property(a => a.UpdatedAt).HasDefaultValueSql("now()").ValueGeneratedOnAddOrUpdate();
          entity.HasIndex(a => a.Name).IsUnique();
        });

        // Configuração de Deal
        modelBuilder.Entity<Deal>(entity =>
        {
          entity.Property(d => d.Title).IsRequired().HasMaxLength(200);
          entity.Property(d => d.Description).HasMaxLength(1000);
          entity.Property(d => d.Priority).HasMaxLength(50).HasDefaultValue("Medium");
          entity.Property(d => d.CreatedAt).HasDefaultValueSql("now()");
          entity.Property(d => d.UpdatedAt).HasDefaultValueSql("now()").ValueGeneratedOnAddOrUpdate();

          entity.HasOne(d => d.Account)
              .WithMany(a => a.Deals)
              .HasForeignKey(d => d.AccountId)
              .OnDelete(DeleteBehavior.ClientSetNull);

          entity.HasOne(d => d.Contact)
              .WithMany(c => c.Deals)
              .HasForeignKey(d => d.ContactId)
              .OnDelete(DeleteBehavior.ClientSetNull);
        });

        // Configuração de Activity
        modelBuilder.Entity<Activity>(entity =>
        {
          entity.Property(t => t.Title).IsRequired().HasMaxLength(200);
          entity.Property(t => t.Description).HasMaxLength(1000);
          entity.Property(t => t.Status).HasMaxLength(50).HasDefaultValue("Pending");
          entity.Property(t => t.Priority).HasMaxLength(50).HasDefaultValue("Medium");
          entity.Property(t => t.Type).HasMaxLength(50).HasDefaultValue("General");
          entity.Property(t => t.CreatedAt).HasDefaultValueSql("now()");
          entity.Property(t => t.UpdatedAt).HasDefaultValueSql("now()").ValueGeneratedOnAddOrUpdate();

          entity.HasOne(t => t.Contact)
              .WithMany(c => c.Activities)
              .HasForeignKey(t => t.ContactId)
              .OnDelete(DeleteBehavior.ClientSetNull);
        });

        // Correção do nome da propriedade de navegação (Activitys -> Activities)
        modelBuilder.Entity<Contact>()
            .HasMany(c => c.Activities)
            .WithOne(t => t.Contact)
            .HasForeignKey(t => t.ContactId);
      }
    }
}