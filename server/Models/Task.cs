using System.ComponentModel.DataAnnotations;

namespace Server.Models
{
  public class Task
  {
    public int Id { get; set; }

    [Required]
    [StringLength(200)]
    public string Title { get; set; } = string.Empty;

    [StringLength(1000)]
    public string? Description { get; set; }

    [StringLength(50)]
    public string Status { get; set; } = "Pending"; // Pending, In Progress, Completed, Cancelled

    [StringLength(50)]
    public string Priority { get; set; } = "Medium"; // Low, Medium, High

    [StringLength(50)]
    public string Type { get; set; } = "General"; // Call, Email, Meeting, Follow-up, General

    public DateTime? DueDate { get; set; }

    public DateTime? CompletedDate { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

    // Navigation properties
    public int? ContactId { get; set; }
    public Contact? Contact { get; set; }

    public int? LeadId { get; set; }
    public Lead? Lead { get; set; }

    public int? DealId { get; set; }
    public Deal? Deal { get; set; }

    public int? AccountId { get; set; }
    public Account? Account { get; set; }
  }
}
