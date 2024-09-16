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
        Task<IEnumerable<FullIndustrialFacilityDTO>> GetFacilityWithPollutionAsync();
        Task<IEnumerable<IndustrialFacility>> GetAllAsync();
        Task<IndustrialFacility> GetByIdAsync(long id);
        Task<bool> InsertAsync(IndustrialFacility facility);
        Task<bool> UpdateAsync(IndustrialFacility facility);
        Task<bool> DeleteAsync(IndustrialFacility facility);
    }
}