using System.ComponentModel.DataAnnotations;

namespace Server.Interfaces
{
  public interface IContactBase
  {
    [Required]
    [StringLength(100)]
    string FirstName { get; set; }

    [Required]
    [StringLength(100)]
    string LastName { get; set; }

    [EmailAddress]
    [StringLength(255)]
    string Email { get; set; }

    [Phone]
    [StringLength(20)]
    string Phone { get; set; }

    [StringLength(100)]
    string? Company { get; set; }

    [StringLength(100)]
    string? JobTitle { get; set; }

     Guid? AccountId { get; set; }
  }
}