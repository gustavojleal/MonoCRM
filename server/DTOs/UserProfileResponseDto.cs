public class UserProfileResponse
{
    public string Id { get; set; } = string.Empty;
    public string Username { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public bool EmailConfirmed { get; set; }
    public string[] Roles { get; set; } = Array.Empty<string>();
    public DateTime AccountCreated { get; set; }
}