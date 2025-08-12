using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json;

namespace Server.Models
{
  public class History
  {
    public int Id { get; set; }

    [Required]
    [StringLength(100)]
    public string Action { get; set; } = string.Empty;

    [Required]
    public DateTime Timestamp { get; set; } = DateTime.UtcNow;
  
    [Column(TypeName = "jsonb")]
    public JsonElement? Details { get; set; }
  
    [Required]
    public int ContactId { get; set; }
    public Contact? Contact { get; set; } = null!;
    public int UserId { get; set; }
 

    // Método para facilitar a desserialização
    public T? GetDetailsAs<T>()
    {
      if (Details.HasValue && Details.Value.ValueKind != JsonValueKind.Null)
      {
        return JsonSerializer.Deserialize<T>(Details.Value.GetRawText());
      }
      return default;
    }
  }
}