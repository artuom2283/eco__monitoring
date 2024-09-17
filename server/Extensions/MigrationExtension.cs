using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Entities;

namespace server.Extensions;

public static class MigrationExtension
{
    public static void ApplyMigrations(this IApplicationBuilder app)
    {
        using IServiceScope scope = app.ApplicationServices.CreateScope();

        using DatabaseContext context = scope.ServiceProvider.GetRequiredService<DatabaseContext>();

        context.Database.Migrate();
        
        /*SeedData(context);*/
    }

    public static void SeedData(DatabaseContext context)
    {
        // Seed data
        if (!context.Facilities.Any())
        {
            context.Facilities.AddRange(
                new IndustrialFacility
                {
                    Id = 1,
                    Name = "ПАТ «АрселорМіттал Кривий Ріг»",
                },
                new IndustrialFacility
                {
                    Id = 2,
                    Name = "АТ «Південний гірничо - збагачувальний комбінат»",
                },
                new IndustrialFacility
                {
                    Id = 3,
                    Name = "ДТЕК «Придніпровська ТЕС»",
                }
            );
        }

        if (!context.Pollutions.Any())
        { 
            context.Pollutions.AddRange(
                // ПАТ «АрселорМіттал Кривий Ріг»
                new Pollution
                {
                    Name = "Оксид азоту",
                    Volume = 2392,
                    Tax = 145.50f,
                    MassFlowRate = 5000,
                    EmissionsLimit = 500,
                    IndustrialFacilityId = 1
                },
                new Pollution
                {
                    Name = "Сірки діоксид",
                    Volume = 8458,
                    Tax = 145.50f,
                    MassFlowRate = 5000,
                    EmissionsLimit = 500,
                    IndustrialFacilityId = 1
                },
                new Pollution
                {
                    Name = "Оксид вуглецю",
                    Volume = 45663,
                    Tax = 145.50f,
                    MassFlowRate = 5000,
                    EmissionsLimit = 250,
                    IndustrialFacilityId = 1
                },
                new Pollution
                {
                    Name = "Речовини у вигляді суспендованих твердих частинок ",
                    Volume = 6859,
                    Tax = 120,
                    MassFlowRate = 250,
                    EmissionsLimit = 50,
                    IndustrialFacilityId = 1
                },
                // АТ «Південний гірничо - збагачувальний комбінат»
                new Pollution
                {
                    Name = "Оксид азоту",
                    Volume = 3.619f,
                    Tax = 145.50f,
                    MassFlowRate = 5000,
                    EmissionsLimit = 500,
                    IndustrialFacilityId = 2
                },
                new Pollution
                {
                    Name = "Сірки діоксид",
                    Volume = 0.002f,
                    Tax = 145.50f,
                    MassFlowRate = 5000,
                    EmissionsLimit = 500,
                    IndustrialFacilityId = 2
                },
                new Pollution
                {
                    Name = "Оксид вуглецю",
                    Volume = 5.570f,
                    Tax = 145.50f,
                    MassFlowRate = 5000,
                    EmissionsLimit = 250,
                    IndustrialFacilityId = 2
                },
                new Pollution
                {
                    Name = "Речовини у вигляді суспендованих твердих частинок ",
                    Volume = 488.289f,
                    Tax = 120,
                    MassFlowRate = 250,
                    EmissionsLimit = 50,
                    IndustrialFacilityId = 2
                },
                // ДТЕК «Придніпровська ТЕС»
                new Pollution
                {
                    Name = "Оксид азоту",
                    Volume = 3619.221f,
                    Tax = 145.50f,
                    MassFlowRate = 5000,
                    EmissionsLimit = 500,
                    IndustrialFacilityId = 3
                },
                new Pollution
                {
                    Name = "Діоксид та інші сполуки сірки",
                    Volume = 21307.42f,
                    Tax = 145.50f,
                    MassFlowRate = 5000,
                    EmissionsLimit = 500,
                    IndustrialFacilityId = 3
                },
                new Pollution
                {
                    Name = "Оксид вуглецю",
                    Volume = 257.321f,
                    Tax = 145.50f,
                    MassFlowRate = 5000,
                    EmissionsLimit = 250,
                    IndustrialFacilityId = 3
                },
                new Pollution
                {
                    Name = "Речовини у вигляді суспендованих твердих частинок ",
                    Volume = 1750.541f,
                    Tax = 120,
                    MassFlowRate = 250,
                    EmissionsLimit = 50,
                    IndustrialFacilityId = 3
                }
            );
        }
        
        context.SaveChangesAsync();
    }
}