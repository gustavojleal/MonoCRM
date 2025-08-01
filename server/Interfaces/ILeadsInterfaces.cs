using System.ComponentModel.DataAnnotations;

namespace Server.Interfaces
{
  public interface ILeadsInterface
  {
    [Required]
    [StringLength(100)]
    string FirstName { get; set; }

    [Required]
    [StringLength(100)]
    string LastName { get; set; }

    [EmailAddress]
    [StringLength(255)]
    string? Email { get; set; }

    [Phone]
    [StringLength(20)]
    string? Phone { get; set; }

    [StringLength(100)]
    string? Company { get; set; }

    [StringLength(100)]
    string? JobTitle { get; set; }

    [StringLength(50)]
    string Status { get; set; } // New, Contacted, Qualified, Unqualified, Converted

    [StringLength(50)]
    string Source { get; set; } // Website, Referral, Cold Call, Email, Social Media, etc.

    [StringLength(50)]
    string Priority { get; set; } // Low, Medium, High

    [StringLength(30)]
    string? AssignedTo { get; set; } // User ID or username of the person assigned to the lead

    [StringLength(1000)]
    string? Notes { get; set; }

    DateTime? LastContactDate { get; set; }

    int? AccountId { get; set; }
    
    int? ConvertedContactId { get; set; }
  }
}