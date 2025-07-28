using System.ComponentModel.DataAnnotations;

namespace Server.DTOs
{
  public class CreateProductDto
  {
    [Required]
    [StringLength(200)]
    public string Name { get; set; } = string.Empty;

    [StringLength(100)]
    public string? Code { get; set; }

    [StringLength(1000)]
    public string? Description { get; set; }

    [StringLength(100)]
    public string? Category { get; set; }

    [Range(0, double.MaxValue)]
    public decimal Price { get; set; }

    [Range(0, double.MaxValue)]
    public decimal? Cost { get; set; }

    [StringLength(50)]
    public string? Unit { get; set; }

    public bool IsActive { get; set; } = true;
  }

  public class UpdateProductDto
  {
    [Required]
    [StringLength(200)]
    public string Name { get; set; } = string.Empty;

    [StringLength(100)]
    public string? Code { get; set; }

    [StringLength(1000)]
    public string? Description { get; set; }

    [StringLength(100)]
    public string? Category { get; set; }

    [Range(0, double.MaxValue)]
    public decimal Price { get; set; }

    [Range(0, double.MaxValue)]
    public decimal? Cost { get; set; }

    [StringLength(50)]
    public string? Unit { get; set; }

    public bool IsActive { get; set; } = true;
  }
}
