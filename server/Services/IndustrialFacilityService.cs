using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using server.DTO;
using server.Entities;
using server.Repository.Interfaces;
using server.Services.Interfaces;

namespace server.Services
{
    public class IndustrialFacilityService : IIndustrialFacilityService
    {
        private readonly IIndustrialFacilityRepository _industrialFacilityRepository;

        public IndustrialFacilityService(IIndustrialFacilityRepository industrialFacilityRepository)
        {
            _industrialFacilityRepository = industrialFacilityRepository;
        }

        public async Task<bool> AddFacility(IndustrialFacilityDto industrialFacilityDto)
        {
            if (industrialFacilityDto == null) return false;

            var industrialFacility = new IndustrialFacility
            {
                Name = industrialFacilityDto.Name,
            };

            return await _industrialFacilityRepository.InsertAsync(industrialFacility);
        }

        public async Task<IEnumerable<IndustrialFacilityDto>> GetFacilitiesInfo()
        {
            var facilities = await _industrialFacilityRepository.GetAllAsync();
            var facilitiesDto = new List<IndustrialFacilityDto>();

            foreach (var facility in facilities)
            {
                var facilityDto = new IndustrialFacilityDto
                {
                    Id = facility.Id,
                    Name = facility.Name,
                };
                facilitiesDto.Add(facilityDto);
            }
            return facilitiesDto;
        }

        public async Task<IEnumerable<FullIndustrialFacilityDTO>> GetFullFacilitiesInfo()
        {
            var fullFacilitiesInfo = await _industrialFacilityRepository.GetFacilityWithPollutionAsync();

            if (fullFacilitiesInfo == null) return null;

            return fullFacilitiesInfo;
        }

        public async Task<IndustrialFacilityDto> GetFacilityById(long id)
        {
            var facility = await _industrialFacilityRepository.GetByIdAsync(id);
            if (facility == null) return null;

            var facilityDto = new IndustrialFacilityDto
            {
                Id = facility.Id,
                Name = facility.Name,
            };
            return facilityDto;

        }

        public async Task<bool> RemoveFacility(long id)
        {
            var facility = await _industrialFacilityRepository.GetByIdAsync(id);

            if (facility == null) return false;

            return await _industrialFacilityRepository.DeleteAsync(facility);
        }

        public async Task<bool> UpdateFacility(IndustrialFacilityDto facilityDto)
        {
            if (facilityDto == null) return false;

            var facility = new IndustrialFacility { Id = facilityDto.Id, Name = facilityDto.Name };

            return await _industrialFacilityRepository.UpdateAsync(facility);
        }
    }
}