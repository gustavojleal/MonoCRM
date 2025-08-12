using System;
using System.ComponentModel.DataAnnotations;

public class ApplicationUserDto
{
    public Guid Id { get; set; }

    [Required(ErrorMessage = "Username is required")]
    [StringLength(50, MinimumLength = 3, 
     ErrorMessage = "Username must be between 3 and 50 characters")]
    public string Username { get; set; } = string.Empty;

    [Required(ErrorMessage = "Email is required")]
    [EmailAddress(ErrorMessage = "Please enter a valid email address")]
    [StringLength(100, ErrorMessage = "Email cannot exceed 100 characters")]
    public string Email { get; set; } = string.Empty;

    [DataType(DataType.Password)]
    [Required(ErrorMessage = "Password is required")]
    [StringLength(100, MinimumLength = 6, 
     ErrorMessage = "Password must be at least 6 characters")]
    public string Password { get; set; } = string.Empty;

    [DataType(DataType.Password)]
    [Compare("Password", ErrorMessage = "Passwords do not match")]
    public string ConfirmPassword { get; set; } = string.Empty;
}

public class ApplicationUserLoginDto
{
    [Required(ErrorMessage = "Username or Email is required")]
    public string UsernameOrEmail { get; set; } = string.Empty;

    [Required(ErrorMessage = "Password is required")]
    public string Password { get; set; } = string.Empty;
}

public class ApplicationUserUpdateDto
{
    [StringLength(50, MinimumLength = 3,
     ErrorMessage = "Username must be between 3 and 50 characters")]
    public string? Username { get; set; }

    [EmailAddress(ErrorMessage = "Please enter a valid email address")]
    public string? Email { get; set; }

    [DataType(DataType.Password)]
    [StringLength(100, MinimumLength = 6,
     ErrorMessage = "Password must be at least 6 characters")]
    public string? NewPassword { get; set; }
}