using Dapper;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.DTOs;
using server.Entities;
using server.Repository.Interfaces;

namespace server.Repository;

public class ReportRepository : IReportRepository
{
    private readonly DatabaseContext _context;
    private readonly IIndustrialFacilityRepository _industrialFacilityRepository;
    private readonly IPollutionRepository _pollutionRepository;

    public ReportRepository(
        DatabaseContext context,
        IIndustrialFacilityRepository industrialFacilityRepository,
        IPollutionRepository pollutionRepository)
    {
        _context = context;
        _industrialFacilityRepository = industrialFacilityRepository;
        _pollutionRepository = pollutionRepository;
    }

    public async Task AddReportAsync(Report report)
    {
        _context.Reports.Add(report);
        await _context.SaveChangesAsync();
    }

    public async Task<Report> GetByParamsAsync(Report report)
    {
        var reportExist = await _context.Reports
            .FirstOrDefaultAsync(r => r.PollutionId == report.PollutionId
                                      && r.IndustrialFacilityId == report.IndustrialFacilityId
                                      && r.Year == report.Year);

        return reportExist;
    }

    public async Task<Report> GetByIdAsync(long id)
    {
        return await _context.Reports.FindAsync(id);
    }

    public async Task DeleteReportAsync(long id)
    {
        var report = await _context.Reports.FindAsync(id);

        _context.Reports.Remove(report);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateReportAsync(Report report)
    {
        var existingReport = await _context.Reports.FindAsync(report.Id);

        existingReport.Year = report.Year;
        existingReport.Volume = report.Volume;
        existingReport.AirTax = report.AirTax;
        existingReport.WaterTax = report.WaterTax;
        existingReport.TotalTax = report.TotalTax;

        await _context.SaveChangesAsync();
    }

    public async Task<IEnumerable<ReportDto>> GetReportsAsync()
    {
        using (var connection = _context.Database.GetDbConnection())
        {
            if (connection.State == System.Data.ConnectionState.Closed)
            {
                await connection.OpenAsync();
            }

            var sqlQuery = @"
                SELECT public.reports.id as Id, public.industrial_facilities.name as FacilityName, public.pollutions.name as PollutionName, public.reports.year as Year, public.reports.volume as Volume,
       public.pollutions.mass_flow_rate as MassFlowRate, public.pollutions.emissions_limit as EmissionsLimit,
       public.reports.air_tax as AirTax, public.reports.water_tax as WaterTax, public.reports.total_tax as TotalTax
FROM reports JOIN public.pollutions on  pollutions.id = reports.pollution_id
             JOIN public.industrial_facilities on industrial_facilities.id = reports.industrial_facility_id
ORDER BY reports.id ASC;";

            return await connection.QueryAsync<ReportDto>(sqlQuery);
        }
    }

    public async Task<IEnumerable<ReportDto>> GetReportsByNameAsync(string name)
    {
        using (var connection = _context.Database.GetDbConnection())
        {
            if (connection.State == System.Data.ConnectionState.Closed)
            {
                await connection.OpenAsync();
            }

            var sqlQuery = @"
                SELECT public.reports.id as Id, public.industrial_facilities.name as FacilityName, public.pollutions.name as PollutionName, public.reports.year as Year, public.reports.volume as Volume,
       public.pollutions.mass_flow_rate as MassFlowRate, public.pollutions.emissions_limit as EmissionsLimit,
       public.reports.air_tax as AirTax, public.reports.water_tax as WaterTax, public.reports.total_tax as TotalTax
FROM reports JOIN public.pollutions on  pollutions.id = reports.pollution_id
             JOIN public.industrial_facilities on industrial_facilities.id = reports.industrial_facility_id
             WHERE public.industrial_facilities.name = @name OR public.pollutions.name = @name
ORDER BY reports.id ASC;";

            return await connection.QueryAsync<ReportDto>(sqlQuery, new { name });
        }
    }

    public async Task<IEnumerable<ReportDto>> GetSortedReportsAsync(string param, string orderBy)
    {
        using (var connection = _context.Database.GetDbConnection())
        {
            if (connection.State == System.Data.ConnectionState.Closed)
            {
                await connection.OpenAsync();
            }

            var validParams = new List<string>
            {
                "reports.year", "reports.volume", "pollutions.mass_flow_rate", "pollutions.emissions_limit",
                "reports.air_tax", "reports.water_tax", "reports.total_tax"
            };
            var validOrder = new List<string> { "ASC", "DESC" };

            if (!validParams.Contains(param.ToLower()) || !validOrder.Contains(orderBy.ToUpper()))
            {
                throw new ArgumentException("Invalid parameters");
            }

            var sqlQuery = @"
                SELECT public.reports.id as Id, public.industrial_facilities.name as FacilityName, public.pollutions.name as PollutionName, public.reports.year as Year, public.reports.volume as Volume,
       public.pollutions.mass_flow_rate as MassFlowRate, public.pollutions.emissions_limit as EmissionsLimit,
       public.reports.air_tax as AirTax, public.reports.water_tax as WaterTax, public.reports.total_tax as TotalTax
FROM reports JOIN public.pollutions on  pollutions.id = reports.pollution_id
             JOIN public.industrial_facilities on industrial_facilities.id = reports.industrial_facility_id";

            sqlQuery += $" ORDER BY {param} {orderBy};";

            return await connection.QueryAsync<ReportDto>(sqlQuery,
                new { param = param.ToLower(), orderBy = orderBy.ToUpper() });
        }
    }
}