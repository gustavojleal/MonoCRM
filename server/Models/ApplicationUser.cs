using Microsoft.AspNetCore.Identity;

namespace Server.Models
{
  public class ApplicationUser : IdentityUser<Guid>
  {
    public DateTime CreatedDate { get; set; }
    public string? FullName { get; set; }
        
    public string? Rules { get; set; }
    }
}