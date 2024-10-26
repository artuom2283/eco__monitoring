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

    public ReportService(
        IReportRepository reportRepository,
        IMapper mapper,
        SortValidator sortValidator)
    {
        _reportRepository = reportRepository;
        _mapper = mapper;
        _sortValidator = sortValidator;
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
    }
    
    public async Task DeleteReport(long id)
    {
        var report = await _reportRepository.GetByIdAsync(id);
        if (report == null)
        {
            throw new EntityNotFoundException();
        }
        
        await _reportRepository.DeleteAsync(report);
    }
    
    public async Task<IEnumerable<FullReportDto>> GetAllReports()
    {
        var reports = await _reportRepository.GetAllAsync();
        
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
    }
    
    public async Task<IEnumerable<FullReportDto>> GetReportsByName(string name)
    {
        if (String.IsNullOrEmpty(name))
        {
            throw new ArgumentException("Name is empty");
        }
        
        var reports = await _reportRepository.GetAllByNameAsync(name);
        
        return _mapper.Map<IEnumerable<FullReportDto>>(reports);
    }
    
    public async Task<IEnumerable<FullReportDto>> GetSortedReports(string param, string orderBy)
    {
        _sortValidator.ValidateParams(param, orderBy);
        
        var reports = await _reportRepository.GetSortedAsync(param, orderBy);
        
        return _mapper.Map<IEnumerable<FullReportDto>>(reports);
    }
}