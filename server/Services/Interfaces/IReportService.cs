using server.DTOs;

namespace server.Services.Interfaces;

public interface IReportService
{
    Task AddReport(ReportDto reportDto);
    Task DeleteReport(long id);
    Task<IEnumerable<FullReportDto>> GetAllReports();
    Task<IEnumerable<FullReportDto>> GetReportsByName(string name);
    Task<IEnumerable<FullReportDto>> GetSortedReports(string param, string orderBy);
    Task UpdateReport(ReportDto reportDto);
}