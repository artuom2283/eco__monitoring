using Serilog;
using server.Extensions;

namespace server;

public class Startup
{
    public IConfiguration Configuration { get; }

    public Startup(IConfiguration configuration)
    {
        Configuration = configuration;
    }

    public void ConfigureServices(IServiceCollection services)
    {
        // Add services to the container.
        services
            .AddDatabase(Configuration)
            .AddSwagger()
            .AddRepositories()
            .AddServices()
            .AddAutoMapper()
            .AddFluentValidation()
            .AddCorsPolicy()
            .AddExceptionHandlers()
            .AddSerilog(Configuration);

        services.AddControllers();
        services.AddEndpointsApiExplorer();
    }

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
        if (env.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
            app.ApplyMigrations();
        }

        app.UseHttpsRedirection();

        app.UseRouting();

        app.UseCors("AllowSpecificOrigin");
        
        app.UseSerilogRequestLogging();

        app.UseAuthorization();

        app.UseEndpoints(endpoints => { endpoints.MapControllers(); });
    }
}