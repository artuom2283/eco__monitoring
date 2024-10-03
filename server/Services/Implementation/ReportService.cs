using AutoMapper;
using server.DTOs;
using server.Entities;
using server.Exceptions;
using server.Repository.Interfaces;
using server.Services.Interfaces;

namespace server.Services;

public class ReportService : IReportService
{
    private readonly IReportRepository _reportRepository;
    private readonly IMapper _mapper;

    public ReportService(
        IReportRepository reportRepository,
        IMapper mapper)
    {
        _reportRepository = reportRepository;
        _mapper = mapper;
    }

    public async Task AddReport(ReportDto reportDto)
    {
        var reportEntity = _mapper.Map<Report>(reportDto);
        
        var reportExist = await _reportRepository.GetByParamsAsync(reportEntity);
        if (reportExist != null)
        {
            throw new EntityAlreadyExistsException();
        }

        await _reportRepository.AddReportAsync(reportEntity);
    }
    
    public async Task DeleteReport(long id)
    {
        var report = await _reportRepository.GetByIdAsync(id);
        if (report == null)
        {
            throw new EntityNotFoundException();
        }
        
        await _reportRepository.DeleteReportAsync(report);
    }
    
    public async Task<IEnumerable<FullReportDto>> GetAllReports()
    {
        var reports = await _reportRepository.GetReportsAsync();
        
        return _mapper.Map<IEnumerable<FullReportDto>>(reports);
    }
    
    public async Task UpdateReport(ReportDto reportDto)
    {
        var report = await _reportRepository.GetByIdAsync(reportDto.Id);
        if (report == null)
        {
            throw new EntityNotFoundException();
        }
        
        var reportEntity = _mapper.Map<Report>(reportDto);
        
        await _reportRepository.UpdateReportAsync(reportEntity);
    }
    
    public async Task<IEnumerable<FullReportDto>> GetReportsByName(string name)
    {
        if (String.IsNullOrEmpty(name))
        {
            throw new ArgumentException("Name is empty");
        }
        
        var reports = await _reportRepository.GetReportsByNameAsync(name);
        
        return _mapper.Map<IEnumerable<FullReportDto>>(reports);
    }
    
    public async Task<IEnumerable<FullReportDto>> GetSortedReports(string param, string orderBy)
    {
        var validParams = new List<string> { "reports.year", "reports.volume", "pollutions.mass_flow_rate", "pollutions.emissions_limit", "reports.air_tax", "reports.water_tax", "reports.total_tax" };
        var validOrder = new List<string> { "ASC", "DESC" };
            
        if (!validParams.Contains(param.ToLower()) || !validOrder.Contains(orderBy.ToUpper()))
        {
            throw new ArgumentException("Invalid parameters");
        }
        
        var reports = await _reportRepository.GetSortedReportsAsync(param, orderBy);
        
        return _mapper.Map<IEnumerable<FullReportDto>>(reports);
    }
}