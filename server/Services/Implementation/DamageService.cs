using AutoMapper;
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

    public DamageService(
        IDamageRepository repository,
        ILogger<DamageService> logger,
        IMapper mapper)
    {
        _repository = repository;
        _logger = logger;
        _mapper = mapper;
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

    public async Task<IEnumerable<DamageDto>> GetAllDamages()
    {
        var damages=  await _repository.GetAllAsync();
        
        _logger.LogInformation("Damages retrieved");
        
        return _mapper.Map<IEnumerable<DamageDto>>(damages);
    }
}