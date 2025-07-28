using System.ComponentModel.DataAnnotations;

namespace Server.DTOs
{
  public class CreateDealProductDto
  {
    public int DealId { get; set; }

    public int ProductId { get; set; }

    [Range(0, int.MaxValue)]
    public int Quantity { get; set; } = 1;

    [Range(0, double.MaxValue)]
    public decimal UnitPrice { get; set; }

    [Range(0, 100)]
    public decimal Discount { get; set; } = 0;
  }

  public class UpdateDealProductDto
  {
    public int DealId { get; set; }

    public int ProductId { get; set; }

    [Range(0, int.MaxValue)]
    public int Quantity { get; set; } = 1;

    [Range(0, double.MaxValue)]
    public decimal UnitPrice { get; set; }

    [Range(0, 100)]
    public decimal Discount { get; set; } = 0;
  }
}
