using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using server.DTO;
using server.Entities;

namespace server.Services.Interfaces
{
    public interface IIndustrialFacilityService
    {
        Task<IEnumerable<FullIndustrialFacilityDTO>> GetFullFacilitiesInfo();
        Task<IEnumerable<IndustrialFacilityDto>> GetFacilitiesInfo();
        Task<IndustrialFacilityDto> GetFacilityById(long id);
        Task<bool> AddFacility(IndustrialFacilityDto industrialFacilityDto);
        Task<bool> RemoveFacility(long id);
        Task<bool> UpdateFacility(IndustrialFacilityDto industrialFacilityDto);
    }
}