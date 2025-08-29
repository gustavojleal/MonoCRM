using System.ComponentModel.DataAnnotations;
using System;

namespace Server.DTOs
{
  public abstract class ContactHistoryBaseDto
  {
    [Required]
    [StringLength(100)]
    public string Action { get; set; } = string.Empty;

    public string? Details { get; set; } 
    public Guid? ContactId { get; set; }
    [Required]
    public Guid UserId { get; set; }
  }

  public class CreateContactHistoryDto : ContactHistoryBaseDto
  {
    // Propriedades específicas de criação podem ser adicionadas aqui
  }

  public class UpdateContactHistoryDto : ContactHistoryBaseDto
  {
    // Propriedades específicas de atualização podem ser adicionadas aqui
  }
  public class ContactHistoryResponseDto : ContactHistoryBaseDto
  {
    // Atualizado para usar Guid em vez de int para Id, consistente com o modelo History
    public Guid Id { get; set; }
    public DateTime Timestamp { get; set; }
  }
}
