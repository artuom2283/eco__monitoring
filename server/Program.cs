using server.Repository;
using server.Repository.Interfaces;
using server.Services;
using server.Services.Interfaces;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors();

builder.Services.AddScoped<IPollutionRepository, PollutionRepository>();
builder.Services.AddScoped<IPollutionService, PollutionService>();
builder.Services.AddScoped<IIndustrialFacilityRepository, IndustrialFacilityRepository>();
builder.Services.AddScoped<IIndustrialFacilityService, IndustrialFacilityService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
