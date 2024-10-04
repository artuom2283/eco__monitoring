using AutoMapper;
using Dapper;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.DTOs;
using server.Entities;
using server.Repository.Base;
using server.Repository.Interfaces;

namespace server.Repository;

public class ReportRepository : IReportRepository
{
    private readonly DatabaseContext _context;

    public ReportRepository(
        DatabaseContext context)
    {
        _context = context;
    }

    async Task<IEnumerable<Report>> IBaseRepository<Report>.GetAllAsync()
    {
        return await _context.Reports.ToListAsync();
    }

    public async Task InsertAsync(Report report)
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
        var report = await _context.Reports.FirstOrDefaultAsync(x => x.Id == id);
        
        return report;
    }

    public async Task DeleteAsync(Report report)
    {
        _context.Reports.Remove(report);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateAsync(Report report)
    {
        var existingReport = await GetByIdAsync(report.Id);

        existingReport.IndustrialFacilityId = report.IndustrialFacilityId;
        existingReport.PollutionId = report.PollutionId;
        existingReport.Year = report.Year;
        existingReport.Volume = report.Volume;
        existingReport.AirTax = report.AirTax;
        existingReport.WaterTax = report.WaterTax;
        existingReport.TotalTax = report.TotalTax;

        await _context.SaveChangesAsync();
    }

    public async Task<IEnumerable<FullReportDto>> GetAllAsync()
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

            return await connection.QueryAsync<FullReportDto>(sqlQuery);
        }
    }

    public async Task<IEnumerable<FullReportDto>> GetAllByNameAsync(string name)
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

            return await connection.QueryAsync<FullReportDto>(sqlQuery, new { name });
        }
    }

    public async Task<IEnumerable<FullReportDto>> GetSortedAsync(string param, string orderBy)
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
             JOIN public.industrial_facilities on industrial_facilities.id = reports.industrial_facility_id";

            sqlQuery += $" ORDER BY {param} {orderBy};";

            return await connection.QueryAsync<FullReportDto>(sqlQuery,
                new { param = param, orderBy = orderBy });
        }
    }
}