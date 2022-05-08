using JiraScrapper.JsonSender.Abstractions;
using JiraScrapper.JsonSender.Realizations;
using JiraScrapper.MocksGenerator.Abstractions;
using JiraScrapper.MocksGenerator.Realizations;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddSingleton<IProjectMocker, ProjectMocker>();
builder.Services.AddSingleton<IIssueMocker, IssueMocker>();
builder.Services.AddSingleton<ISprintMocker, SprintMocker>();

builder.Services.AddTransient<IJsonSender, JsonSender>();

builder.Services.AddCors();

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(
        builder =>
        {
            builder.WithOrigins("https://localhost:44351", "http://localhost:4200")
                .AllowAnyHeader()
                .AllowAnyMethod();
        });
});

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();

app.MapControllers();

app.Run();
