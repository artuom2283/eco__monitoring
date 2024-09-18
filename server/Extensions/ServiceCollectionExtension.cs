using FluentValidation;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using server.Data;
using server.Repository;
using server.Repository.Interfaces;
using server.Services;
using server.Services.Interfaces;
using server.Validators;

namespace server.Extensions;

public static class ServiceCollectionExtension
{
    public static IServiceCollection AddDatabase(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddDbContext<DatabaseContext>(options =>
        {
            options.UseNpgsql(configuration.GetConnectionString("DatabaseConnection"));
        });

        return services;
    }

    public static IServiceCollection AddSwagger(this IServiceCollection services)
    {
        services.AddSwaggerGen(c =>
        {
            c.SwaggerDoc("v1", new OpenApiInfo { Title = "Eco-Monitoring-API", Version = "v1" });
        });

        return services;
    }

    public static IServiceCollection AddRepositories(this IServiceCollection services)
    {
        services.AddScoped<IPollutionRepository, PollutionRepository>();
        services.AddScoped<IIndustrialFacilityRepository, IndustrialFacilityRepository>();

        return services;
    }

    public static IServiceCollection AddServices(this IServiceCollection services)
    {
        services.AddScoped<IPollutionService, PollutionService>();
        services.AddScoped<IIndustrialFacilityService, IndustrialFacilityService>();

        return services;
    }

    public static IServiceCollection AddAutoMapper(this IServiceCollection services)
    {
        services.AddAutoMapper(typeof(Startup));

        return services;
    }

    public static IServiceCollection AddFluentValidation(this IServiceCollection services)
    {
        var assembly = typeof(Program).Assembly;

        services.AddValidatorsFromAssembly(assembly);

        return services;
    }

    public static IServiceCollection AddCorsPolicy(this IServiceCollection services)
    {
        services.AddCors(options =>
        {
            options.AddPolicy("AllowSpecificOrigin", builder =>
            {
                builder.WithOrigins("http://localhost:3000")
                       .AllowAnyHeader()
                       .AllowAnyMethod()
                       .AllowCredentials();
            });
        });

        return services;
    }
}