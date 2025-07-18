using System.ComponentModel.DataAnnotations;

namespace Server.Models
{
  public class Lead
  {
    public int Id { get; set; }

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

    [StringLength(50)]
    public string Status { get; set; } = "New"; // New, Contacted, Qualified, Unqualified, Converted

    [StringLength(50)]
    public string Source { get; set; } = "Unknown"; // Website, Referral, Cold Call, Email, Social Media, etc.

    [StringLength(50)]
    public string Priority { get; set; } = "Medium"; // Low, Medium, High

    [StringLength(1000)]
    public string? Notes { get; set; }

    public DateTime? LastContactDate { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

    // Navigation properties
    public int? AccountId { get; set; }
    public Account? Account { get; set; }

    public int? ConvertedContactId { get; set; }
    public Contact? ConvertedContact { get; set; }

    public ICollection<Deal> Deals { get; set; } = new List<Deal>();
    public ICollection<Task> Tasks { get; set; } = new List<Task>();
  }
}
