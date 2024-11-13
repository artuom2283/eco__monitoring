using server.DTOs;

namespace server.Services.Interfaces;

public interface IDamageService
{
    public Task AddDamage(DamageDto damageDto);
    public Task DeleteDamage(long id);
    public IEnumerable<DamageDto> GetAllDamages();
}