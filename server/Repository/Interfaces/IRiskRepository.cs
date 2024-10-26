using server.Entities;
using server.Repository.Base;

namespace server.Repository.Interfaces;

public interface IRiskRepository : IBaseRepository<Risk>
{
    public Task<Risk> GetByParamsAsync(string substanceName, string calculationType);
}