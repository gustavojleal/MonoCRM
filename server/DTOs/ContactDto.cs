using System.ComponentModel.DataAnnotations;
using Server.Interfaces;

namespace Server.DTOs
{
  public abstract class ContactBaseDto
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

    public Guid? AccountId { get; set; }

    [StringLength(30)]
    public string? Status { get; set; } = "new"; // Default status
  }

  public class CreateContactDto : ContactBaseDto
  {
    // To add specific properties for creation if needed
  }

  public class UpdateContactDto : ContactBaseDto
  {
    // To add specific properties for update if needed
  }

  public class ContactResponseDto : ContactBaseDto
  {
    public Guid Id { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    public List<ContactHistoryResponseDto>? Histories { get; set;}
  }
}