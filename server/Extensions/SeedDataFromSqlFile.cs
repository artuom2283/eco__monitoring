using Microsoft.EntityFrameworkCore;
using Npgsql;
using server.Data;

namespace server.Extensions;

public static class SeedDataFromSqlFile
{
    public static void ExecuteSqlFromFile(this IApplicationBuilder app)
    {
        using IServiceScope scope = app.ApplicationServices.CreateScope();
        
        var configuration = scope.ServiceProvider.GetRequiredService<IConfiguration>();
        
        var connectionString = configuration.GetConnectionString("DatabaseConnection");

        var sqlFilePath = Path.Combine(Environment.CurrentDirectory, "Data", "initial_database.sql");
        var sql = File.ReadAllText(sqlFilePath);

        using (var connection = new NpgsqlConnection(connectionString))
        {
            connection.Open();
            
            using (var command = new NpgsqlCommand(sql, connection))
            {
                command.ExecuteNonQuery();
            }
        }
    }
}