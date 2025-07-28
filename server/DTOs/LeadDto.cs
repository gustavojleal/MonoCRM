using System.ComponentModel.DataAnnotations;

namespace Server.DTOs
{
  public class CreateLeadDto
  {
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
    public string Status { get; set; } = "New";

    [StringLength(50)]
    public string Source { get; set; } = "Unknown";

    [StringLength(50)]
    public string Priority { get; set; } = "Medium";

    [StringLength(1000)]
    public string? Notes { get; set; }

    public DateTime? LastContactDate { get; set; }

    public int? AccountId { get; set; }

    public int? ConvertedContactId { get; set; }
  }

  public class UpdateLeadDto
  {
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
    public string Status { get; set; } = "New";

    [StringLength(50)]
    public string Source { get; set; } = "Unknown";

    [StringLength(50)]
    public string Priority { get; set; } = "Medium";

    [StringLength(1000)]
    public string? Notes { get; set; }

    public DateTime? LastContactDate { get; set; }

    public int? AccountId { get; set; }

    public int? ConvertedContactId { get; set; }
  }
}
