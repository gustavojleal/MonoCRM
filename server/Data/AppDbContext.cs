using Microsoft.EntityFrameworkCore;
using Server.Models;

namespace Server.Data
{
  public class AppDbContext : DbContext
  {
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Deal> Deals { get; set; } // Tabela de negócios
    public DbSet<Account> Accounts { get; set; } // Tabela de contas
    public DbSet<Contact> Contacts { get; set; } // Tabela de contatos
    public DbSet<Lead> Leads { get; set; } // Tabela de leads
    public DbSet<Product> Products { get; set; } // Tabela de produtos
    public DbSet<Activity> Activity { get; set; } // Tabela de tarefas 

  protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    base.OnModelCreating(modelBuilder);

    // Configuração de Account
    modelBuilder.Entity<Account>(entity =>
    {
        entity.Property(a => a.Name)
            .IsRequired()
            .HasMaxLength(100);
            
        entity.Property(a => a.Description)
            .HasMaxLength(500);
            
        entity.Property(a => a.CreatedAt)
            .HasDefaultValueSql("CURRENT_TIMESTAMP"); // SQL Server
        
        entity.Property(a => a.UpdatedAt)
            .HasDefaultValueSql("CURRENT_TIMESTAMP")
            .ValueGeneratedOnAddOrUpdate();

        // Índice único corrigido
        entity.HasIndex(a => a.Name)
            .IsUnique();
    });

    // Configuração de Deal
    modelBuilder.Entity<Deal>(entity =>
    {
        entity.Property(d => d.Title)
            .IsRequired()
            .HasMaxLength(200);
            
        entity.Property(d => d.Description)
            .HasMaxLength(1000);
            
        entity.Property(d => d.Priority)
            .HasMaxLength(50)
            .HasDefaultValue("Medium");
            
        entity.Property(d => d.CreatedAt)
            .HasDefaultValueSql("CURRENT_TIMESTAMP");
            
        entity.Property(d => d.UpdatedAt)
            .HasDefaultValueSql("CURRENT_TIMESTAMP")
            .ValueGeneratedOnAddOrUpdate();

        // Comportamento de deleção seguro
        entity.HasOne(d => d.Account)
            .WithMany(a => a.Deals)
            .HasForeignKey(d => d.AccountId)
            .OnDelete(DeleteBehavior.Restrict); // Alterado para Restrict

        entity.HasOne(d => d.Contact)
            .WithMany(c => c.Deals)
            .HasForeignKey(d => d.ContactId)
            .OnDelete(DeleteBehavior.Restrict); // Alterado para Restrict
        
   
    });

    // Configuração de Activity
    modelBuilder.Entity<Activity>(entity =>
    {
        entity.HasKey(t => t.Id);
        entity.Property(t => t.Id)
            .ValueGeneratedOnAdd(); // Geração automática de ID
        entity.Property(t => t.Title)
            .IsRequired()
            .HasMaxLength(200);

        entity.Property(t => t.Description)
            .HasMaxLength(1000);
            
        entity.Property(t => t.Status)
            .HasMaxLength(50)
            .HasDefaultValue("Pending");
            
        entity.Property(t => t.Priority)
            .HasMaxLength(50)
            .HasDefaultValue("Medium");
            
        entity.Property(t => t.Type)
            .HasMaxLength(50)
            .HasDefaultValue("General");
            
        entity.Property(t => t.CreatedAt)
            .HasDefaultValueSql("CURRENT_TIMESTAMP");
            
        entity.Property(t => t.UpdatedAt)
            .HasDefaultValueSql("CURRENT_TIMESTAMP")
            .ValueGeneratedOnAddOrUpdate();
      // Comportamento de deleção seguro
    
        entity.HasOne(t => t.Contact)
              .WithMany(c => c.Activitys)
              .HasForeignKey(t => t.ContactId)
              .OnDelete(DeleteBehavior.Restrict); // Alterado para Restrict
    });

    // Configuração de Contact
    modelBuilder.Entity<Contact>(entity =>
    {
        entity.Property(c => c.FirstName)
            .IsRequired()
            .HasMaxLength(100);
            
        entity.Property(c => c.LastName)
            .IsRequired()
            .HasMaxLength(100);
            
        entity.Property(c => c.Email)
            .HasMaxLength(255);
            
        entity.Property(c => c.Phone)
            .HasMaxLength(20);
            
        entity.Property(c => c.Company)
            .HasMaxLength(100);
            
        entity.Property(c => c.JobTitle)
            .HasMaxLength(100);
            
        entity.Property(c => c.Notes)
            .HasMaxLength(500);
            
        entity.Property(c => c.CreatedAt)
            .HasDefaultValueSql("CURRENT_TIMESTAMP");
            
        entity.Property(c => c.UpdatedAt)
            .HasDefaultValueSql("CURRENT_TIMESTAMP")
            .ValueGeneratedOnAddOrUpdate();

        // Índices únicos
        entity.HasIndex(c => c.Email)
            .IsUnique()
            .HasFilter("'Email' IS NOT NULL");
            
        entity.HasIndex(c => c.Phone)
            .IsUnique()
            .HasFilter("'Phone' IS NOT NULL");
        
        // Relação com Account
        entity.HasOne(c => c.Account)
            .WithMany(a => a.Contacts)
            .HasForeignKey(c => c.AccountId)
            .OnDelete(DeleteBehavior.Restrict);
    });

    // Configuração de Lead
    modelBuilder.Entity<Lead>(entity =>
    {
        entity.Property(l => l.FirstName)
            .IsRequired()
            .HasMaxLength(100);
            
        entity.Property(l => l.LastName)
            .IsRequired()
            .HasMaxLength(100);
            
        entity.Property(l => l.Email)
            .HasMaxLength(255);
            
        entity.Property(l => l.Phone)
            .HasMaxLength(20);
            
        entity.Property(l => l.Company)
            .HasMaxLength(100);
            
        entity.Property(l => l.JobTitle)
            .HasMaxLength(100);
            
        entity.Property(l => l.Notes)
            .HasMaxLength(500);
            
        entity.Property(l => l.CreatedAt)
            .HasDefaultValueSql("CURRENT_TIMESTAMP");
            
        entity.Property(l => l.UpdatedAt)
            .HasDefaultValueSql("CURRENT_TIMESTAMP")
            .ValueGeneratedOnAddOrUpdate();

        // Índices únicos
        entity.HasIndex(l => l.Email)
            .IsUnique()
            .HasFilter("'Email' IS NOT NULL");
            
        entity.HasIndex(l => l.Phone)
            .IsUnique()
            .HasFilter("'Phone' IS NOT NULL");
        
        // Conversão para enum (se usar enum)
        // entity.Property(l => l.Status)
        //     .HasConversion<string>();
    });

    // Configuração de Product (ADICIONADA)
    modelBuilder.Entity<Product>(entity =>
    {
        entity.Property(p => p.Name)
            .IsRequired()
            .HasMaxLength(100);
            
        entity.Property(p => p.Description)
            .HasMaxLength(500);
   
            
        entity.Property(p => p.Price)
            .HasColumnType("decimal(18,2)");
            
        entity.Property(p => p.CreatedAt)
            .HasDefaultValueSql("CURRENT_TIMESTAMP");
            
        entity.Property(p => p.UpdatedAt)
            .HasDefaultValueSql("CURRENT_TIMESTAMP")
            .ValueGeneratedOnAddOrUpdate();
        
   
    });
}

  }
}