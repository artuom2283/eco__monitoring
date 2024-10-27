using AutoMapper;
using server.DTOs;
using server.Entities;
using server.Exceptions;
using server.Repository.Interfaces;
using server.Services.Interfaces;
using server.Validators;

namespace server.Services;

public class ReportService : IReportService
{
    private readonly IReportRepository _reportRepository;
    private readonly IMapper _mapper;
    private readonly SortValidator _sortValidator;
    private readonly ILogger<ReportService> _logger;

    public ReportService(
        IReportRepository reportRepository,
        IMapper mapper,
        SortValidator sortValidator,
        ILogger<ReportService> logger)
    {
        _reportRepository = reportRepository;
        _mapper = mapper;
        _sortValidator = sortValidator;
        _logger = logger;
    }

    public async Task AddReport(AddReportDto addReportDto)
    {
        var reportEntity = _mapper.Map<Report>(addReportDto);
        
        var reportExist = await _reportRepository.GetByParamsAsync(reportEntity);
        if (reportExist != null)
        {
            throw new EntityAlreadyExistsException();
        }

        await _reportRepository.InsertAsync(reportEntity);
        
        _logger.LogInformation($"Adding report to database: {reportEntity.Id}");
    }
    
    public async Task DeleteReport(long id)
    {
        var report = await _reportRepository.GetByIdAsync(id);
        if (report == null)
        {
            throw new EntityNotFoundException();
        }
        
        await _reportRepository.DeleteAsync(report);
        
        _logger.LogInformation($"Deleting report from database: {id}");
    }
    
    public async Task<IEnumerable<FullReportDto>> GetAllReports()
    {
        var reports = await _reportRepository.GetAllAsync();
        
        _logger.LogInformation($"Retrieving all reports from database: {reports.Count()}");
        
        return _mapper.Map<IEnumerable<FullReportDto>>(reports);
    }
    
    public async Task UpdateReport(UpdateReportDto updateReportDto)
    {
        var report = await _reportRepository.GetByIdAsync(updateReportDto.Id);
        if (report == null)
        {
            throw new EntityNotFoundException();
        }
        
        var reportEntity = _mapper.Map<Report>(updateReportDto);
        
        await _reportRepository.UpdateAsync(reportEntity);
        
        _logger.LogInformation($"Updating report from database: {updateReportDto.Id}");
    }
    
    public async Task<IEnumerable<FullReportDto>> GetReportsByName(string name)
    {
        if (String.IsNullOrEmpty(name))
        {
            throw new ArgumentException("Name is empty");
        }
        
        var reports = await _reportRepository.GetAllByNameAsync(name);
        
        _logger.LogInformation($"Retrieving reports by name from database: {name}");
        
        return _mapper.Map<IEnumerable<FullReportDto>>(reports);
    }
    
    public async Task<IEnumerable<FullReportDto>> GetSortedReports(string param, string orderBy)
    {
        _sortValidator.ValidateParams(param, orderBy);
        
        var reports = await _reportRepository.GetSortedAsync(param, orderBy);
        
        _logger.LogInformation($"Retrieving sorted reports from database: {param}");
        
        return _mapper.Map<IEnumerable<FullReportDto>>(reports);
    }
}