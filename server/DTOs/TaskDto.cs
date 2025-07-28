using System.ComponentModel.DataAnnotations;

namespace Server.DTOs
{
  public class CreateTaskDto
  {
    [Required]
    [StringLength(200)]
    public string Title { get; set; } = string.Empty;

    [StringLength(1000)]
    public string? Description { get; set; }

    [StringLength(50)]
    public string Status { get; set; } = "Pending";

    [StringLength(50)]
    public string Priority { get; set; } = "Medium";

    [StringLength(50)]
    public string Type { get; set; } = "General";

    public DateTime? DueDate { get; set; }

    public DateTime? CompletedDate { get; set; }

    public int? ContactId { get; set; }

    public int? LeadId { get; set; }

    public int? DealId { get; set; }

    public int? AccountId { get; set; }
  }

  public class UpdateTaskDto
  {
    [Required]
    [StringLength(200)]
    public string Title { get; set; } = string.Empty;

    [StringLength(1000)]
    public string? Description { get; set; }

    [StringLength(50)]
    public string Status { get; set; } = "Pending";

    [StringLength(50)]
    public string Priority { get; set; } = "Medium";

    [StringLength(50)]
    public string Type { get; set; } = "General";

    public DateTime? DueDate { get; set; }

    public DateTime? CompletedDate { get; set; }

    public int? ContactId { get; set; }

    public int? LeadId { get; set; }

    public int? DealId { get; set; }

    public int? AccountId { get; set; }
  }
}
