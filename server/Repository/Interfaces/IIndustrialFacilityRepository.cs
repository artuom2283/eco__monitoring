using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using server.DTO;
using server.Entities;

namespace server.Repository.Interfaces
{
    public interface IIndustrialFacilityRepository
    {
        Task<IEnumerable<FullIndustrialFacilityDto>> GetFacilityWithPollutionAsync();
        Task<IEnumerable<IndustrialFacility>> GetAllAsync();
        Task<IndustrialFacility> GetByIdAsync(long id);
        Task<IndustrialFacility> GetByNameAsync(string name);
        Task InsertAsync(IndustrialFacility facility);
        Task UpdateAsync(IndustrialFacility facility);
        Task DeleteAsync(IndustrialFacility facility);
    }
}