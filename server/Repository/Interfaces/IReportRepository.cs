using server.DTOs;
using server.Entities;
using server.Repository.Base;

namespace server.Repository.Interfaces;

public interface IReportRepository : IBaseRepository<Report>
{
    Task<IEnumerable<FullReportDto>> GetAllAsync();
    Task<Report> GetByParamsAsync(Report report);
    Task<IEnumerable<FullReportDto>> GetAllByNameAsync(string name);
    Task<IEnumerable<FullReportDto>> GetSortedAsync(string param, string orderBy);
}