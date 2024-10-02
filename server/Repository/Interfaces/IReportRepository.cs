using server.DTOs;
using server.Entities;

namespace server.Repository.Interfaces;

public interface IReportRepository
{
    Task AddReportAsync(Report report);
    Task<Report> GetByParamsAsync(Report report);
    Task<Report> GetByIdAsync(long id);
    Task DeleteReportAsync(long id);
    Task UpdateReportAsync(Report report);
    Task<IEnumerable<ReportDto>> GetReportsAsync();
    Task<IEnumerable<ReportDto>> GetReportsByNameAsync(string name);
    Task<IEnumerable<ReportDto>> GetSortedReportsAsync(string param, string orderBy);
}