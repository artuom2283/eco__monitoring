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
        Task<IEnumerable<FullIndustrialFacilityDto>> GetFullFacilitiesInfo();
        Task<IEnumerable<FullIndustrialFacilityDto>> GetFullFacilitiesInfoByName(string name);
        Task<IEnumerable<FullIndustrialFacilityDto>> GetFullFacilitiesInfoSortByAscending();
        Task<IEnumerable<FullIndustrialFacilityDto>> GetFullFacilitiesInfoSortByDescending();
        Task<IEnumerable<IndustrialFacilityDto>> GetFacilitiesInfo();
        Task<IndustrialFacilityDto> GetFacilityById(long id);
        Task AddFacility(IndustrialFacilityDto industrialFacilityDto);
        Task DeleteFacility(long id);
        Task UpdateFacility(IndustrialFacilityDto industrialFacilityDto);
    }
}