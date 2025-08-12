using System;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

public class ApplicationUser : IdentityUser<Guid>
{
  public ApplicationUser()
  {
    Id = Guid.NewGuid();
    UserName =string.Empty; 
    Email = string.Empty; ;
    CreatedDate = DateTime.UtcNow;
  }

  [Required(ErrorMessage = "Username is required")]
  [StringLength(50, MinimumLength = 3,
   ErrorMessage = "Username must be between 3 and 50 characters")]
  public override string? UserName { get; set; }

  [Required(ErrorMessage = "Email is required")]
  [EmailAddress(ErrorMessage = "Please enter a valid email address")]
  [StringLength(100, ErrorMessage = "Email cannot exceed 100 characters")]
  public override string? Email { get; set; }

  public DateTime CreatedDate { get; private set; }
}