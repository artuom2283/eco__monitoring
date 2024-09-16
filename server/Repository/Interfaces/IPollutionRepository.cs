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
        Task<bool> InsertAsync(Pollution pollution);
        Task<bool> UpdateAsync(Pollution pollution);
        Task<bool> DeleteAsync(Pollution pollution);
    }
}