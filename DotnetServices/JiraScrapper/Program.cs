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

builder.Services.AddSingleton<IProjectMoqer, ProjectMoqer>();
builder.Services.AddSingleton<IIssueMoqer, IssueMoqer>();
builder.Services.AddSingleton<ISprintMoqer, SprintMoqer>();
builder.Services.AddTransient<IJsonSender, JsonSender>();

builder.Services.AddCors(options =>
{
        options.AddDefaultPolicy(
                builder =>
                {
                        builder.AllowAnyOrigin()
                                .AllowAnyHeader()
                                .AllowAnyMethod();
                });
});

var app = builder.Build();

#if DEBUG
app.Urls.Add("http://localhost:5001");
app.Urls.Add( "https://localhost:5002");
#endif

app.UseSwagger();
app.UseSwaggerUI();

app.MapControllers();

app.Run();
