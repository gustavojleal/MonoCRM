using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System;

namespace Server.Models
{
  public class Contact
  {
    public Guid Id { get; set; }

    [Required]
    [StringLength(100)]
    public string FirstName { get; set; } = string.Empty;

    [Required]
    [StringLength(100)]
    public string LastName { get; set; } = string.Empty;

    [EmailAddress]
    [StringLength(255)]
    public string? Email { get; set; }

    [Phone]
    [StringLength(20)]
    public string? Phone { get; set; }

    [StringLength(100)]
    public string? Company { get; set; }

    [StringLength(100)]
    public string? JobTitle { get; set; }

    [StringLength(30)]
    public string? status { get; set; } = "new"; 

    public Guid? AccountId { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

    // Navigation properties
    public Account? Account { get; set; }
    public ICollection<Deal> Deals { get; set; } = new List<Deal>();
    public ICollection<Activity> Activities { get; set; } = new List<Activity>();
    public ICollection<ContactHistory> ContactHistories { get; set; } = new List<ContactHistory>();
  }
}