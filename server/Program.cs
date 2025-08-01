using Microsoft.EntityFrameworkCore;
using Server.Data;

var builder = WebApplication.CreateBuilder(args);

// DbContext with PostgreSQL
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
builder.Services.AddAuthorization();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Add CORS for development
builder.Services.AddCors(options =>
{
  options.AddDefaultPolicy(policy =>
  {
    policy.WithOrigins("http://localhost:3000") // Substitua pelo domínio do front-end
            .AllowAnyHeader()
            .AllowAnyMethod();
  });
});

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    dbContext.Database.Migrate();
}


// Configure middleware pipeline
if (app.Environment.IsDevelopment())
{
  app.UseSwagger();
  app.UseSwaggerUI();
}

if (!app.Environment.IsDevelopment())
{
  app.UseHttpsRedirection();
}

app.UseCors(); // Adicione o middleware de CORS
app.UseRouting();
app.UseAuthorization();
app.MapControllers();

app.Run();