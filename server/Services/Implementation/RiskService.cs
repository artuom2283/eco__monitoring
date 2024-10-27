using AutoMapper;
using server.DTOs;
using server.Entities;
using server.Exceptions;
using server.Repository.Interfaces;
using server.Services.Interfaces;

namespace server.Services;

public class RiskService : IRiskService
{
    private readonly IRiskRepository _riskRepository;
    private readonly ILogger<RiskService> _logger;
    private readonly IMapper _mapper;

    public RiskService(
        IRiskRepository riskRepository,
        ILogger<RiskService> logger,
        IMapper mapper)
    {
        _riskRepository = riskRepository;
        _logger = logger;
        _mapper = mapper;
    }
    
    public async Task AddRisk(RiskDto riskDto)
    {
        var risk = _mapper.Map<Risk>(riskDto);

        var riskAlreadyExist = await _riskRepository.GetByParamsAsync(riskDto.SubstanceName, riskDto.CalculationType);
        if (riskAlreadyExist != null)
        {
            throw new EntityAlreadyExistsException();
        }
        
        await _riskRepository.InsertAsync(risk);
        
        _logger.LogInformation("Risk added");
    }

    public async Task DeleteRisk(long id)
    {
        var riskExist = await _riskRepository.GetByIdAsync(id);
        if (riskExist == null)
        {
            throw new EntityNotFoundException();
        }
        
        await _riskRepository.DeleteAsync(riskExist);
        
        _logger.LogInformation("Risk deleted");
    }

    public async Task<IEnumerable<RiskDto>> GetAllRisks()
    {
        var risks=  await _riskRepository.GetAllAsync();
        
        _logger.LogInformation("Risks retrieved");
        
        return _mapper.Map<IEnumerable<RiskDto>>(risks);
    }
}