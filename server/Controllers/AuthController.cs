using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography; 

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly SignInManager<ApplicationUser> _signInManager;
    private readonly IConfiguration _configuration;
    private readonly ILogger<AuthController> _logger;

    public AuthController(
        UserManager<ApplicationUser> userManager,
        SignInManager<ApplicationUser> signInManager,
        IConfiguration configuration,
        ILogger<AuthController> logger)
    {
        _userManager = userManager;
        _signInManager = signInManager;
        _configuration = configuration;
        _logger = logger;
    }

    #region Admin Endpoints
    [Authorize(Roles = "Admin")]
    [HttpGet("admin-dashboard")]
    public async Task<IActionResult> AdminDashboard()
    {
        try
        {
            var adminStats = new
            {
                TotalUsers = await _userManager.Users.CountAsync(),
                ActiveUsers = await _userManager.Users.CountAsync(u => u.LockoutEnd == null),
                LockedUsers = await _userManager.Users.CountAsync(u => u.LockoutEnd != null),
                ServerTime = DateTime.UtcNow
            };
   
            return Ok(new ApiResponse<object>
            {
                Success = true,
                Data = adminStats,
                Message = "Administrative dashboard data retrieved"
            });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error in AdminDashboard");
            return StatusCode(500, new ApiResponse<object>
            {
                Success = false,
                Message = "Error processing administrative request",
                Error = ex.Message
            });
        }
    }

    [HttpGet("users")]
    public async Task<IActionResult> GetAllUsers()
    {
        try
        {
            var users = _userManager.Users.ToList();

            var userList = users.Select(u => new
            {
                u.Id,
                u.UserName,
                u.Email
            });

            return Ok(userList);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Erro ao buscar usuários: {ex.Message}");
        }
}
    // [Authorize(Policy = "UserManagement")]
    [HttpPost("users")]
    public async Task<IActionResult> CreateUser([FromBody] CreateUserRequestDto request)
    {
        try
        {
            if (!ModelState.IsValid)
                return BadRequest(new ApiValidationErrorResponse(ModelState));

            var existingUser = await _userManager.FindByEmailAsync(request.Email);
            if (existingUser != null)
            {
                return Conflict(new ApiResponse<object>
                {
                    Success = false,
                    Message = "Email already in use",
                    Suggestion = "Use password recovery if needed"
                });
            }

            var user = new ApplicationUser
            {
                UserName = request.Username,
                Email = request.Email,
                EmailConfirmed = false
            };

            var result = await _userManager.CreateAsync(user, request.Password);
            if (!result.Succeeded)
            {
                return BadRequest(new ApiResponse<object>
                {
                    Success = false,
                    Message = "Failed to create user",
                    Errors = result.Errors.Select(e => e.Description)
                });
            }

            if (!string.IsNullOrEmpty(request.DefaultRole))
            {
                await _userManager.AddToRoleAsync(user, request.DefaultRole);
            }

            // Generate email confirmation token
            var confirmationToken = await _userManager.GenerateEmailConfirmationTokenAsync(user);
            
            return CreatedAtAction(nameof(GetUserById), new { id = user.Id }, new ApiResponse<object>
            {
                Success = true,
                Data = new { UserId = user.Id },
                Message = "User created successfully",
                NextSteps = new[] { "Confirm email to activate account" }
            });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error creating user");
            return StatusCode(500, new ApiResponse<object>
            {
                Success = false,
                Message = "Internal error processing user creation",
                Error = ex.Message
            });
        }
    }
    #endregion

    #region Public Endpoints
    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterDto model)
    {
        try
        {
            if (!ModelState.IsValid)
                return BadRequest(new ApiValidationErrorResponse(ModelState));

            var user = new ApplicationUser
            {
                UserName = model.Username,
                Email = model.Email
            };

            var result = await _userManager.CreateAsync(user, model.Password);
            
            if (!result.Succeeded)
            {
                return BadRequest(new ApiResponse<object>
                {
                    Success = false,
                    Message = "Registration failed",
                    Errors = result.Errors.Select(e => e.Description)
                });
            }

            // Assign default user role
            await _userManager.AddToRoleAsync(user, "User");

            return Ok(new ApiResponse<object>
            {
                Success = true,
                Message = "User registered successfully",
                NextSteps = new[] { "Check your email for confirmation instructions" }
            });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error during registration");
            return StatusCode(500, new ApiResponse<object>
            {
                Success = false,
                Message = "Error during registration process",
                Error = ex.Message
            });
        }
    }

  [HttpPost("login")]
  public async Task<IActionResult> Login([FromBody] LoginDto model)
  {
       try
    {
        var result = await _signInManager.PasswordSignInAsync(
            model.Username, model.Password, isPersistent: false, lockoutOnFailure: true);

        if (result.IsLockedOut)
        {
            _logger.LogWarning($"Account locked out: {model.Username}");
            return Unauthorized(new ApiResponse<object>
            {
                Success = false,
                Message = "Account locked due to multiple failed attempts",
                Suggestion = "Try again later or reset your password"
            });
        }

        if (!result.Succeeded)
        {
            return Unauthorized(new ApiResponse<object>
            {
                Success = false,
                Message = "Invalid credentials"
            });
        }

        var user = await _userManager.FindByNameAsync(model.Username);
        
        // Add null check for user
        if (user == null)
        {
            _logger.LogWarning($"Login succeeded but user not found: {model.Username}");
            return Unauthorized(new ApiResponse<object>
            {
                Success = false,
                Message = "User account not found"
            });
        }

        var roles = await _userManager.GetRolesAsync(user);
        Response.Headers["Access-Control-Allow-Credentials"] = "true";
        Response.Headers["Access-Control-Allow-Origin"] = "http://localhost:3000";
        
        var token = GenerateJwtToken(user, roles);
        var refreshToken = GenerateRefreshToken();

        await StoreRefreshToken(user.Id.ToString(), refreshToken);

      var userProfile = new UserProfileResponse
      { 
        Id = user.Id.ToString(),
        Username = user.UserName,
        Email = user.Email,
        Roles = (await _userManager.GetRolesAsync(user)).ToArray()

      };


        return Ok(new ApiResponse<AuthResponse>
        {
          Success = true,
          Data = new AuthResponse
          {
            Token = token,
            RefreshToken = refreshToken,
            ExpiresIn = Convert.ToInt32(_configuration["Jwt:ExpiryInMinutes"]) * 60,
            TokenType = "Bearer",
            User = userProfile

          },
          Message = "Authentication successful"
        });
    }
    catch (Exception ex)
    {
        _logger.LogError(ex, "Error during login");
        return StatusCode(500, new ApiResponse<object>
        {
            Success = false,
            Message = "Error during authentication",
            Error = ex.Message
        });
    }
    }

    [HttpPost("refresh-token")]
    public async Task<IActionResult> RefreshToken([FromBody] RefreshTokenRequest request)
    {
        try
        {
            var principal = GetPrincipalFromExpiredToken(request.Token);
            var userId = principal.FindFirstValue(ClaimTypes.NameIdentifier);
            
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized(new ApiResponse<object>
                {
                    Success = false,
                    Message = "Invalid token"
                });
            }

            // Validate stored refresh token (implementation depends on your storage)
            var isValid = await ValidateRefreshToken(userId, request.RefreshToken);
            
            if (!isValid)
            {
                return Unauthorized(new ApiResponse<object>
                {
                    Success = false,
                    Message = "Invalid refresh token"
                });
            }

            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return NotFound(new ApiResponse<object>
                {
                    Success = false,
                    Message = "User not found"
                });
            }

            var roles = await _userManager.GetRolesAsync(user);
            
            var newToken = GenerateJwtToken(user, roles);
            var newRefreshToken = GenerateRefreshToken();

            // Update stored refresh token
            await StoreRefreshToken(user.Id.ToString(), newRefreshToken);

            return Ok(new ApiResponse<AuthResponse>
            {
                Success = true,
                Data = new AuthResponse
                {
                    Token = newToken,
                    RefreshToken = newRefreshToken,
                    ExpiresIn = Convert.ToInt32(_configuration["Jwt:ExpiryInMinutes"]) * 60
                },
                Message = "Token refreshed successfully"
            });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error refreshing token");
            return StatusCode(500, new ApiResponse<object>
            {
                Success = false,
                Message = "Error refreshing token",
                Error = ex.Message
            });
        }
    }
    #endregion

    #region User Management
    [Authorize]
    [HttpGet("users/{id}")]
    public async Task<IActionResult> GetUserById(string id)
    {
        try
        {
            var currentUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var isAdmin = User.IsInRole("Admin");

            // Users can only view their own profile unless they're admins
            if (currentUserId != id && !isAdmin)
            {
                return Forbid();
            }

            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
            {
                return NotFound(new ApiResponse<object>
                {
                    Success = false,
                    Message = "User not found"
                });
            }

            var roles = await _userManager.GetRolesAsync(user);

            return Ok(new ApiResponse<UserProfileResponse>
            {
                Success = true,
                Data = new UserProfileResponse
                {
                    Id = user.Id.ToString(),
                    Username = user.UserName ?? string.Empty,
                    Email = user.Email ?? string.Empty,
                    EmailConfirmed = user.EmailConfirmed,
                    Roles = roles.ToArray(),
                    AccountCreated = user.CreatedDate 
                }
            });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, $"Error getting user by ID: {id}");
            return StatusCode(500, new ApiResponse<object>
            {
                Success = false,
                Message = "Error retrieving user information",
                Error = ex.Message
            });
        }
    }
    #endregion

    #region Helper Methods
    private string GenerateJwtToken(ApplicationUser user, IList<string> roles)
    {
        var claims = new List<Claim>
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.Email, user.Email ?? string.Empty),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
        };

        foreach (var role in roles)
        {
            claims.Add(new Claim(ClaimTypes.Role, role));
        }

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"] ?? throw new InvalidOperationException("JWT Key not configured")));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
        var expires = DateTime.Now.AddMinutes(Convert.ToDouble(_configuration["Jwt:ExpiryInMinutes"]));

        var token = new JwtSecurityToken(
            issuer: _configuration["Jwt:Issuer"],
            audience: _configuration["Jwt:Audience"],
            claims: claims,
            expires: expires,
            signingCredentials: creds);

        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    private string GenerateRefreshToken()
    {
        var randomNumber = new byte[32];
        using var rng = RandomNumberGenerator.Create();
        rng.GetBytes(randomNumber);
        return Convert.ToBase64String(randomNumber);
    }

    private ClaimsPrincipal GetPrincipalFromExpiredToken(string token)
    {
        var tokenValidationParameters = new TokenValidationParameters
        {
            ValidateAudience = false,
            ValidateIssuer = false,
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"] ?? throw new InvalidOperationException("JWT Key not configured"))),
            ValidateLifetime = false
        };

        var tokenHandler = new JwtSecurityTokenHandler();
        var principal = tokenHandler.ValidateToken(token, tokenValidationParameters, out var securityToken);
        
        if (securityToken is not JwtSecurityToken jwtSecurityToken || 
            !jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase))
        {
            throw new SecurityTokenException("Invalid token");
        }

        return principal;
    }

    private async Task StoreRefreshToken(string userId, string refreshToken)
    {
        // Implementation depends on your storage
        // Example: Save to database
        await Task.CompletedTask;
    }

    private async Task<bool> ValidateRefreshToken(string userId, string refreshToken)
    {
        // Implementation depends on your storage
        // Example: Check against database
        return await Task.FromResult(false);
    }
    #endregion
}


