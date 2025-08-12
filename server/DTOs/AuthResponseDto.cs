public class AuthResponse
{
  public string Token { get; set; } = string.Empty;
  public string RefreshToken { get; set; } = string.Empty;
  public int ExpiresIn { get; set; }
  public string? TokenType { get; set; }

  public UserProfileResponse? User { get; set; }
  
}