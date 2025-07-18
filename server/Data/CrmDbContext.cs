using Microsoft.EntityFrameworkCore;
using Server.Models;

namespace Server.Data
{
  public class CrmDbContext : DbContext
  {
    public CrmDbContext(DbContextOptions<CrmDbContext> options) : base(options)
    {
    }

    public DbSet<Account> Accounts { get; set; }
    public DbSet<Contact> Contacts { get; set; }
    public DbSet<Lead> Leads { get; set; }
    public DbSet<Deal> Deals { get; set; }
    public DbSet<Models.Task> Tasks { get; set; }
    public DbSet<Product> Products { get; set; }
    public DbSet<DealProduct> DealProducts { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
      base.OnModelCreating(modelBuilder);

      // Configure relationships
      modelBuilder.Entity<Contact>()
        .HasOne(c => c.Account)
        .WithMany(a => a.Contacts)
        .HasForeignKey(c => c.AccountId)
        .OnDelete(DeleteBehavior.SetNull);

      modelBuilder.Entity<Lead>()
        .HasOne(l => l.Account)
        .WithMany(a => a.Leads)
        .HasForeignKey(l => l.AccountId)
        .OnDelete(DeleteBehavior.SetNull);

      modelBuilder.Entity<Lead>()
        .HasOne(l => l.ConvertedContact)
        .WithMany()
        .HasForeignKey(l => l.ConvertedContactId)
        .OnDelete(DeleteBehavior.SetNull);

      modelBuilder.Entity<Deal>()
        .HasOne(d => d.Account)
        .WithMany(a => a.Deals)
        .HasForeignKey(d => d.AccountId)
        .OnDelete(DeleteBehavior.SetNull);

      modelBuilder.Entity<Deal>()
        .HasOne(d => d.Contact)
        .WithMany(c => c.Deals)
        .HasForeignKey(d => d.ContactId)
        .OnDelete(DeleteBehavior.SetNull);

      modelBuilder.Entity<Deal>()
        .HasOne(d => d.Lead)
        .WithMany(l => l.Deals)
        .HasForeignKey(d => d.LeadId)
        .OnDelete(DeleteBehavior.SetNull);

      modelBuilder.Entity<Models.Task>()
        .HasOne(t => t.Contact)
        .WithMany(c => c.Tasks)
        .HasForeignKey(t => t.ContactId)
        .OnDelete(DeleteBehavior.SetNull);

      modelBuilder.Entity<Models.Task>()
        .HasOne(t => t.Lead)
        .WithMany(l => l.Tasks)
        .HasForeignKey(t => t.LeadId)
        .OnDelete(DeleteBehavior.SetNull);

      modelBuilder.Entity<Models.Task>()
        .HasOne(t => t.Deal)
        .WithMany(d => d.Tasks)
        .HasForeignKey(t => t.DealId)
        .OnDelete(DeleteBehavior.SetNull);

      modelBuilder.Entity<Models.Task>()
        .HasOne(t => t.Account)
        .WithMany()
        .HasForeignKey(t => t.AccountId)
        .OnDelete(DeleteBehavior.SetNull);

      modelBuilder.Entity<DealProduct>()
        .HasOne(dp => dp.Deal)
        .WithMany(d => d.DealProducts)
        .HasForeignKey(dp => dp.DealId)
        .OnDelete(DeleteBehavior.Cascade);

      modelBuilder.Entity<DealProduct>()
        .HasOne(dp => dp.Product)
        .WithMany(p => p.DealProducts)
        .HasForeignKey(dp => dp.ProductId)
        .OnDelete(DeleteBehavior.Cascade);

      // Configure indexes for better performance
      modelBuilder.Entity<Contact>()
        .HasIndex(c => c.Email);

      modelBuilder.Entity<Lead>()
        .HasIndex(l => l.Email);

      modelBuilder.Entity<Account>()
        .HasIndex(a => a.Name);

      modelBuilder.Entity<Deal>()
        .HasIndex(d => d.Stage);

      modelBuilder.Entity<Models.Task>()
        .HasIndex(t => t.Status);

      modelBuilder.Entity<Product>()
        .HasIndex(p => p.Code);
    }
  }
}
