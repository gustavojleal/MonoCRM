using System.ComponentModel.DataAnnotations;

namespace Server.Models
{
  public class ContactHistory
  {

    public Guid Id { get; set; }
    public string Action { get; set; } = string.Empty;
    public DateTime Timestamp { get; set; } = DateTime.UtcNow;
    public string? Details { get; set; }
    public Guid ContactId { get; set; }
    public Contact? Contact { get; set; }

    public Guid UserId { get; set; }
    public ApplicationUser? User { get; set; }

    }
}
