using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;

namespace Server.Services
{
    public interface IEmailService
    {
        Task SendConfirmationEmailAsync(string email, string confirmationLink);
        Task SendPasswordResetEmailAsync(string email, string resetLink);
    }

    public class EmailService : IEmailService
    {
        private readonly IConfiguration _configuration;
        private readonly ILogger<EmailService> _logger;
        private readonly SmtpClient _smtpClient;

        public EmailService(IConfiguration configuration, ILogger<EmailService> logger)
        {
            _configuration = configuration;
            _logger = logger;
            
            // Configure SMTP client from appsettings.json
            _smtpClient = new SmtpClient
            {
                Host = _configuration["EmailSettings:SmtpHost"],
                Port = int.Parse(_configuration["EmailSettings:SmtpPort"]),
                EnableSsl = bool.Parse(_configuration["EmailSettings:EnableSsl"]),
                Credentials = new NetworkCredential(
                    _configuration["EmailSettings:Username"],
                    _configuration["EmailSettings:Password"])
            };
        }

        public async Task SendConfirmationEmailAsync(string email, string confirmationLink)
        {
            var mailMessage = new MailMessage
            {
                From = new MailAddress(_configuration["EmailSettings:FromAddress"]),
                Subject = "Confirm Your Email Address",
                Body = $"Please confirm your account by clicking this link: {confirmationLink}",
                IsBodyHtml = true
            };
            mailMessage.To.Add(email);

            await SendEmailAsync(mailMessage);
            _logger.LogInformation($"Confirmation email sent to {email}");
        }

        public async Task SendPasswordResetEmailAsync(string email, string resetLink)
        {
            var mailMessage = new MailMessage
            {
                From = new MailAddress(_configuration["EmailSettings:FromAddress"]),
                Subject = "Password Reset Request",
                Body = $"Reset your password by clicking here: {resetLink}",
                IsBodyHtml = true
            };
            mailMessage.To.Add(email);

            await SendEmailAsync(mailMessage);
            _logger.LogInformation($"Password reset email sent to {email}");
        }

        private async Task SendEmailAsync(MailMessage mailMessage)
        {
            try
            {
                await _smtpClient.SendMailAsync(mailMessage);
            }
            catch (SmtpException ex)
            {
                _logger.LogError(ex, $"Error sending email to {mailMessage.To}");
                throw; // Re-throw for controller to handle
            }
        }
    }
}