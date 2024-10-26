using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Entities;
using server.Repository.Interfaces;

namespace server.Repository;

public class RiskRepository : IRiskRepository
{
    private readonly DatabaseContext _context;

    public RiskRepository(DatabaseContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Risk>> GetAllAsync()
    {
        return await _context.Risks.ToListAsync();
    }

    public async Task InsertAsync(Risk risk)
    {
        _context.Risks.Add(risk);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(Risk risk)
    {
        var riskEntity = await GetByIdAsync(risk.Id);
        _context.Risks.Remove(riskEntity);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateAsync(Risk risk)
    {
        var riskEntity = await GetByIdAsync(risk.Id);

        riskEntity.Result = risk.Result;
        riskEntity.CalculationType = risk.CalculationType;
        riskEntity.SubstanceName = risk.SubstanceName;
        
        await _context.SaveChangesAsync();
    }

    public async Task<Risk> GetByIdAsync(long id)
    {
        var riskEntity = await _context.Risks.FirstOrDefaultAsync(x => x.Id == id);
        
        return riskEntity;
    }

    public Task<Risk> GetByParamsAsync(string substanceName, string calculationType)
    {
        return _context.Risks.FirstOrDefaultAsync(x => x.CalculationType == calculationType && x.SubstanceName == substanceName);
    }
}