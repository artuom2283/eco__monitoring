﻿using FluentValidation;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using Serilog;
using server.Data;
using server.Handlers;
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
        services.AddScoped<IReportRepository, ReportRepository>();
        services.AddScoped<IRiskRepository, RiskRepository>();
        services.AddScoped<IDamageRepository, DamageRepository>();

        return services;
    }

    public static IServiceCollection AddServices(this IServiceCollection services)
    {
        services.AddScoped<IPollutionService, PollutionService>();
        services.AddScoped<IIndustrialFacilityService, IndustrialFacilityService>();
        services.AddScoped<IReportService, ReportService>();
        services.AddScoped<IRiskService, RiskService>();
        services.AddScoped<IDamageService, DamageService>();

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
        services.AddScoped<SortValidator>();

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
    
    public static IServiceCollection AddExceptionHandlers(this IServiceCollection services)
    {
        services.AddExceptionHandler<AlreadyExistsExceptionHandler>();
        services.AddExceptionHandler<NotFoundExceptionHandler>();
        services.AddProblemDetails();

        return services;
    }
    
    public static IServiceCollection AddSerilog(this IServiceCollection services, IConfiguration configuration)
    {
        Log.Logger = new LoggerConfiguration()
            .MinimumLevel.Verbose() 
            .ReadFrom.Configuration(configuration)
            .CreateLogger();

        services.AddSerilog();

        return services;
    }
}