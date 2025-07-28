using System.ComponentModel.DataAnnotations;

namespace Server.DTOs
{
  public class CreateDealDto
  {
    [Required]
    [StringLength(200)]
    public string Title { get; set; } = string.Empty;

    [StringLength(1000)]
    public string? Description { get; set; }

    [Range(0, double.MaxValue)]
    public decimal Amount { get; set; }

    [StringLength(50)]
    public string Stage { get; set; } = "Prospecting";

    [Range(0, 100)]
    public int Probability { get; set; } = 0;

    public DateTime? ExpectedCloseDate { get; set; }

    public DateTime? ActualCloseDate { get; set; }

    [StringLength(50)]
    public string Priority { get; set; } = "Medium";

    [StringLength(1000)]
    public string? Notes { get; set; }

    public int? AccountId { get; set; }

    public int? ContactId { get; set; }

    public int? LeadId { get; set; }
  }

  public class UpdateDealDto
  {
    [Required]
    [StringLength(200)]
    public string Title { get; set; } = string.Empty;

    [StringLength(1000)]
    public string? Description { get; set; }

    [Range(0, double.MaxValue)]
    public decimal Amount { get; set; }

    [StringLength(50)]
    public string Stage { get; set; } = "Prospecting";

    [Range(0, 100)]
    public int Probability { get; set; } = 0;

    public DateTime? ExpectedCloseDate { get; set; }

    public DateTime? ActualCloseDate { get; set; }

    [StringLength(50)]
    public string Priority { get; set; } = "Medium";

    [StringLength(1000)]
    public string? Notes { get; set; }

    public int? AccountId { get; set; }

    public int? ContactId { get; set; }

    public int? LeadId { get; set; }
  }
}
