public interface IEmailService
{
    void SendConfirmationEmail(string email, string token);
}

public class EmailService : IEmailService
{
    private readonly IConfiguration _config;
    private readonly ILogger<EmailService> _logger;

    public EmailService(IConfiguration config, ILogger<EmailService> logger)
    {
        _config = config;
        _logger = logger;
    }

    public void SendConfirmationEmail(string email, string token)
    {
        // Actual implementation using SendGrid, MailKit, etc.
        _logger.LogInformation($"Confirmation email simulated for {email}");
        _logger.LogDebug($"Confirmation token: {token}");
    }
}