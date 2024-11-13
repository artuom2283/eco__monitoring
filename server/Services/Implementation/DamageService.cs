using AutoMapper;
using server.Data;
using server.DTOs;
using server.Entities;
using server.Exceptions;
using server.Repository.Interfaces;
using server.Services.Interfaces;

namespace server.Services;

public class DamageService : IDamageService
{
    private readonly IDamageRepository _repository;
    private readonly ILogger<DamageService> _logger;
    private readonly IMapper _mapper;
    private readonly DatabaseContext _context;

    public DamageService(
        IDamageRepository repository,
        ILogger<DamageService> logger,
        IMapper mapper,
        DatabaseContext context)
    {
        _repository = repository;
        _logger = logger;
        _mapper = mapper;
        _context = context;
    }
    
    public async Task AddDamage(DamageDto damageDto)
    {
        var risk = _mapper.Map<Damage>(damageDto);
        
        await _repository.InsertAsync(risk);
        
        _logger.LogInformation("Damage added");
    }

    public async Task DeleteDamage(long id)
    {
        var damageExist = await _repository.GetByIdAsync(id);
        if (damageExist == null)
        {
            throw new EntityNotFoundException();
        }
        
        await _repository.DeleteAsync(damageExist);
        
        _logger.LogInformation("Damage deleted");
    }

    public IEnumerable<DamageDto> GetAllDamages()
    {
        var damages = from damage in _context.Damages 
                join pollution in _context.Pollutions on damage.PollutionId equals pollution.Id
                join facility in _context.Facilities on damage.IndustrialFacilityId equals facility.Id
                select new DamageDto
                {
                    Id = damage.Id,
                    IndustrialFacilityId = facility.Id,
                    PollutionId = pollution.Id,
                    Type = damage.Type,
                    Year = damage.Year,
                    Result = damage.Result
                };
        
        _logger.LogInformation("Damages retrieved");
        
        return _mapper.Map<IEnumerable<DamageDto>>(damages);
    }
}