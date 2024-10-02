using server.DTOs;

namespace server.Services.Interfaces;

public interface IReportService
{
    Task AddReport(ReportDto reportDto);
    Task DeleteReport(long id);
    Task<IEnumerable<ReportDto>> GetAllReports();
    Task<IEnumerable<ReportDto>> GetReportsByName(string name);
    Task<IEnumerable<ReportDto>> GetSortedReports(string param, string orderBy);
    Task UpdateReport(ReportDto reportDto);
    Task<ReportDto> GetReportById(long id);
}