var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

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
app.Urls.Add("http://localhost:5003");
app.Urls.Add( "https://localhost:5004");
#endif

app.UseSwagger();
app.UseSwaggerUI();

//TODO Create a model for cheese and bins for frontend
//TODO Add project name to issue
//TODO change return type of json

app.MapControllers();

app.Run();
