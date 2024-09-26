using AutoMapper;
using server.DTO;
using server.Entities;
using server.Exceptions;
using server.Repository.Interfaces;
using server.Services.Interfaces;

namespace server.Services
{
    public class IndustrialFacilityService : IIndustrialFacilityService
    {
        private readonly IIndustrialFacilityRepository _industrialFacilityRepository;
        private readonly IMapper _mapper;

        public IndustrialFacilityService(
            IIndustrialFacilityRepository industrialFacilityRepository,
            IMapper mapper)
        {
            _industrialFacilityRepository = industrialFacilityRepository;
            _mapper = mapper;
        }

        public async Task AddFacility(IndustrialFacilityDto industrialFacilityDto)
        {
            var industrialFacilityExist = await _industrialFacilityRepository.GetByNameAsync(industrialFacilityDto.Name);
            if(industrialFacilityExist != null)
                throw new EntityAlreadyExistsException();

            var industrialFacilityEntity = _mapper.Map<IndustrialFacility>(industrialFacilityDto);

            await _industrialFacilityRepository.InsertAsync(industrialFacilityEntity);
        }

        public async Task<IEnumerable<IndustrialFacilityDto>> GetFacilitiesInfo()
        {
            var facilities = await _industrialFacilityRepository.GetAllAsync();
            
            var facilitiesDto = _mapper.Map<IEnumerable<IndustrialFacilityDto>>(facilities);
            
            return facilitiesDto;
        }

        public async Task<IEnumerable<FullIndustrialFacilityDto>> GetFullFacilitiesInfo()
        {
            var fullFacilitiesInfo = await _industrialFacilityRepository.GetFacilityWithPollutionAsync();

            return fullFacilitiesInfo;
        }
        
        public async Task<IEnumerable<FullIndustrialFacilityDto>> GetFullFacilitiesInfoByName(string name)
        {
            var fullFacilitiesInfo = await _industrialFacilityRepository.GetFacilityWithPollutionByNameAsync(name);

            return fullFacilitiesInfo;
        }
        
        public async Task<IEnumerable<FullIndustrialFacilityDto>> GetFullFacilitiesInfoSortByAscending()
        {
            var fullFacilitiesInfo = await _industrialFacilityRepository.GetFacilityWithPollutionSortByAscendingAsync();

            return fullFacilitiesInfo;
        }
        
        public async Task<IEnumerable<FullIndustrialFacilityDto>> GetFullFacilitiesInfoSortByDescending()
        {
            var fullFacilitiesInfo = await _industrialFacilityRepository.GetFacilityWithPollutionSortByDescendingAsync();

            return fullFacilitiesInfo;
        }

        public async Task<IndustrialFacilityDto> GetFacilityById(long id)
        {
            var facility = await _industrialFacilityRepository.GetByIdAsync(id);
            if (facility == null)
                throw new EntityNotFoundException();

            var facilityDto = _mapper.Map<IndustrialFacilityDto>(facility);
            
            return facilityDto;
        }

        public async Task DeleteFacility(long id)
        {
            var facility = await _industrialFacilityRepository.GetByIdAsync(id);
            if (facility == null) 
                throw new EntityNotFoundException();

            await _industrialFacilityRepository.DeleteAsync(facility);
        }

        public async Task UpdateFacility(IndustrialFacilityDto industrialFacilityDto)
        {
            var industrialFacilityExist = await _industrialFacilityRepository.GetByIdAsync(industrialFacilityDto.Id);
            if(industrialFacilityExist == null)
                throw new EntityNotFoundException();

            var facility = _mapper.Map<IndustrialFacility>(industrialFacilityDto);

            await _industrialFacilityRepository.UpdateAsync(facility);
        }
    }
}