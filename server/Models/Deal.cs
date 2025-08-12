using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Server.Models
{
  public class Deal
  {
    public int Id { get; set; }

    [Required]
    [StringLength(200)]
    public string Title { get; set; } = string.Empty;

    [StringLength(1000)]
    public string? Description { get; set; }

    [Column(TypeName = "decimal(18,2)")]
    public decimal Amount { get; set; }

    [StringLength(50)]
    public string Stage { get; set; } = "Prospecting"; // Prospecting, Qualification, Proposal, Negotiation, Closed Won, Closed Lost

    [Range(0, 100)]
    public int Probability { get; set; } = 0; // 0-100%

    public DateTime? ExpectedCloseDate { get; set; }

    public DateTime? ActualCloseDate { get; set; }

    [StringLength(50)]
    public string Priority { get; set; } = "Medium"; // Low, Medium, High

    [StringLength(1000)]
    public string? Notes { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

    // Navigation properties
    public int? AccountId { get; set; }
    public Account? Account { get; set; }

    public int? ContactId { get; set; }
    public Contact? Contact { get; set; }

    public ICollection<Activity> Activitys { get; set; } = new List<Activity>();
  }
}
