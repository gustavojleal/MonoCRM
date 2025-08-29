using System.ComponentModel.DataAnnotations;

namespace Server.DTOs
{
  public class CreateActivityDto
  {
    [Required]
    [StringLength(200)]
    public Guid Id { get; set; }
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

    public Guid? ContactId { get; set; }

    public Guid? DealId { get; set; }

    public Guid? AccountId { get; set; }
  }

  public class UpdateActivityDto
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

    public Guid? ContactId { get; set; }

    public Guid? DealId { get; set; }

    public Guid? AccountId { get; set; }
  }
}
