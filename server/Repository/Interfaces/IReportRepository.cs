using server.DTOs;
using server.Entities;

namespace server.Repository.Interfaces;

public interface IReportRepository
{
    Task AddReportAsync(Report report);
    Task<Report> GetByParamsAsync(Report report);
    Task<Report> GetByIdAsync(long id);
    Task DeleteReportAsync(Report report);
    Task UpdateReportAsync(Report report);
    Task<IEnumerable<FullReportDto>> GetReportsAsync();
    Task<IEnumerable<FullReportDto>> GetReportsByNameAsync(string name);
    Task<IEnumerable<FullReportDto>> GetSortedReportsAsync(string param, string orderBy);
}