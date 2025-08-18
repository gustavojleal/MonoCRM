using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity; 
using Server.Data;
using Server.Services; 


var builder = WebApplication.CreateBuilder(args);

// Configuração para PostgreSQL
AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);

// DbContext com PostgreSQL
builder.Services.AddDbContext<AppDbContext>(options => 
{
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"));
    
    if (builder.Environment.IsDevelopment())
    {
        options.EnableDetailedErrors();
        options.EnableSensitiveDataLogging();
    }
});

builder.Services.AddControllers();

// Registrando os serviços de dependência



builder.Services.AddAuthorization();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configuração do Identity (corrigida)
builder.Services.AddIdentity<ApplicationUser, IdentityRole<Guid>>()
    .AddEntityFrameworkStores<AppDbContext>()
    .AddRoles<IdentityRole<Guid>>()
    .AddDefaultTokenProviders();

builder.Services.ConfigureApplicationCookie(options =>
{
    options.Cookie.SameSite = SameSiteMode.None;
    options.Cookie.HttpOnly = true;
    
    // Auto-adjust security for environment
    options.Cookie.SecurePolicy = builder.Environment.IsDevelopment()
        ? CookieSecurePolicy.None
        : CookieSecurePolicy.Always;

    // API-friendly redirect handling
    options.Events.OnRedirectToLogin = context =>
    {
        context.Response.StatusCode = StatusCodes.Status401Unauthorized;
        return Task.CompletedTask;
    };
    options.Events.OnRedirectToAccessDenied = context =>
    {
        context.Response.StatusCode = StatusCodes.Status403Forbidden;
        return Task.CompletedTask;
    };
    // Optional: Customize cookie name if needed
    options.Cookie.Name = "app_auth";
    
    // Optional: Set expiration if using sliding sessions
    options.ExpireTimeSpan = TimeSpan.FromHours(8);
    options.SlidingExpiration = true;

});


builder.Services.Configure<IdentityOptions>(options =>
{
    options.User.RequireUniqueEmail = true;
    options.Password.RequireUppercase = true;
    options.Password.RequireDigit = true;
    options.Password.RequiredLength = 8;
});

builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("UserManagement", policy =>
    {
        policy.RequireAuthenticatedUser();
        policy.RequireAssertion(context =>
            context.User.IsInRole("Admin") || 
            context.User.HasClaim("Permission", "UserManagement"));
    });
});

// CORS para desenvolvimento
builder.Services.AddCors(options =>
{
    options.AddPolicy("DefaultPolicy", policy =>
    {
      policy.WithOrigins("http://localhost:3000")
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();
           
    });
});


builder.Logging.ClearProviders();
builder.Logging.AddConsole();

// builder.Services.AddScoped<IEmailService, EmailService>(); 
builder.Services.AddScoped<IContactService, ContactService>();
builder.Services.AddScoped<IHistoryService, HistoryService>();
builder.Services.AddAutoMapper(typeof(Program).Assembly);


var app = builder.Build();

// Aplicar migrações e seed data
// using (var scope = app.Services.CreateScope())
// {
//     var services = scope.ServiceProvider;
//     try 
//     {
//         var context = services.GetRequiredService<AppDbContext>();
//         context.Database.Migrate();
        
//         await SeedData.Initialize(services);
//     }
//     catch (Exception ex)
//     {
//         var logger = services.GetRequiredService<ILogger<Program>>();
//         logger.LogError(ex, "An error occurred during migration/seeding");
//     }
// }

// Pipeline de middleware
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseRouting();

app.Use(async (context, next) =>
{
    if (context.Request.Method == "OPTIONS")
    {
      Console.WriteLine("Handling CORS preflight request ===> "+ "  "+ context.Request.Path);
        context.Response.Headers["Access-Control-Allow-Credentials"] = "true";
        context.Response.Headers["Access-Control-Allow-Origin"] = "http://localhost:3000";
        context.Response.Headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization, X-Requested-With";
        context.Response.Headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS";
        context.Response.StatusCode = 200;
        await context.Response.CompleteAsync();
    }
    else
    {
        await next();
    }
});
app.UseCors("DefaultPolicy");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();