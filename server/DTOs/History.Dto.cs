using System.ComponentModel.DataAnnotations;

namespace Server.DTOs
{
  public abstract class HistoryBaseDto
  {
    [Required]
    [StringLength(100)]
    public string Action { get; set; } = string.Empty;

    public string? Details { get; set; } // JSON string 
    public int? ContactId { get; set; }
    [Required]
    public int UserId { get; set; }
  }

  public class CreateHistoryDto : HistoryBaseDto
  {
    // Propriedades específicas de criação podem ser adicionadas aqui
  }

  public class UpdateHistoryDto : HistoryBaseDto
  {
    // Propriedades específicas de atualização podem ser adicionadas aqui
  }
  public class HistoryResponseDto : HistoryBaseDto
  {
    public int Id { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
  }
}
