using System.ComponentModel.DataAnnotations;

namespace Server.Models
{
  public class Contact
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

    [StringLength(500)]
    public string? Notes { get; set; }

    public int? AccountId { get; set; }

    // Navigation properties
    public Account? Account { get; set; }
    public ICollection<Deal> Deals { get; set; } = new List<Deal>();
    public ICollection<Models.Task> Tasks { get; set; } = new List<Models.Task>();
  }
}
