using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Entities;
using server.Repository.Interfaces;

namespace server.Repository;

public class DamageRepository : IDamageRepository
{
    private readonly DatabaseContext _context;

    public DamageRepository(DatabaseContext context)
    {
        _context = context;
    }
    
    public async Task<IEnumerable<Damage>> GetAllAsync()
    {
        return await _context.Damages.ToListAsync();
    }

    public async Task InsertAsync(Damage damage)
    {
        await _context.Damages.AddAsync(damage);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(Damage damage)
    {
        var damageEntity = await _context.Damages.FindAsync(damage.Id);
        _context.Damages.Remove(damageEntity);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateAsync(Damage damage)
    {
        var damageEntity = await GetByIdAsync(damage.Id);

        damageEntity.Result = damage.Result;
        damageEntity.Type = damage.Type;
        damageEntity.Year = damage.Year;
        
        await _context.SaveChangesAsync();
    }

    public async Task<Damage> GetByIdAsync(long id)
    {
        var damageEntity = await _context.Damages.FirstOrDefaultAsync(x => x.Id == id);
        
        return damageEntity;
    }
}