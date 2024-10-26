using server.DTOs;

namespace server.Services.Interfaces;

public interface IRiskService
{
    public Task AddRisk(RiskDto riskDto);
    public Task DeleteRisk(long id);
    public Task<IEnumerable<RiskDto>> GetAllRisks();
}