var builder = WebApplication.CreateBuilder(args);

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

// Add services to the container.
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

#if DEBUG
app.Urls.Add("http://localhost:5003");
app.Urls.Add( "https://localhost:5004");
#endif

app.UseSwagger();
app.UseSwaggerUI();

app.UseCors();

app.MapControllers();

app.Run();
