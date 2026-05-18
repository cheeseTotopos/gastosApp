using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Agregar soporte para controllers
builder.Services.AddControllers();
builder.Services.AddScoped<LoginService>();
//singletons are just for teesting the api responses
builder.Services.AddScoped<UserService>();
//builder.Services.AddSingleton<LoginService>();
builder.Services.AddScoped<MovementClasificationService>();
builder.Services.AddScoped<MovementService>();
builder.Services.AddScoped<TokenConstructor>();


builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//conection to dabase
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

builder.Services.AddDbContext<AppDBConection>(options =>
    options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString))
);

//use bearear for jwt authentication
var key = builder.Configuration["jwt"];
if (string.IsNullOrEmpty(key))
    throw new Exception("JWT Key not configured");

builder.Services.AddAuthentication("Bearer")
    .AddJwtBearer("Bearer", options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(key)
            ),

            ValidateIssuer = true,
            ValidIssuer = "https://myapi",

            ValidateAudience = true,
            ValidAudience = "https://myfrontend",

            ValidateLifetime = true
        };
    });


builder.Services.AddAuthorization();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();