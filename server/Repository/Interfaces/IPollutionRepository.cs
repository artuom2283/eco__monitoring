using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using server.Entities;

namespace server.Repository.Interfaces
{
    public interface IPollutionRepository
    {
        Task<IEnumerable<Pollution>> GetAllAsync();
        Task<Pollution> GetByIdAsync(long id);
        Task<Pollution> GetPollutionByNameAsync(string name);
        Task InsertAsync(Pollution pollution);
        Task UpdateAsync(Pollution pollution);
        Task DeleteAsync(Pollution pollution);
    }
}