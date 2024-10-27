using AutoMapper;
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
        private readonly ILogger<IndustrialFacilityService> _logger;

        public IndustrialFacilityService(
            IIndustrialFacilityRepository industrialFacilityRepository,
            IMapper mapper,
            ILogger<IndustrialFacilityService> logger)
        {
            _industrialFacilityRepository = industrialFacilityRepository;
            _mapper = mapper;
            _logger = logger;
        }

        public async Task AddFacility(IndustrialFacilityDto industrialFacilityDto)
        {
            var industrialFacilityExist = await _industrialFacilityRepository.GetByNameAsync(industrialFacilityDto.Name);
            if(industrialFacilityExist != null)
                throw new EntityAlreadyExistsException();

            var industrialFacilityEntity = _mapper.Map<IndustrialFacility>(industrialFacilityDto);

            await _industrialFacilityRepository.InsertAsync(industrialFacilityEntity);
            
            _logger.LogInformation($"Industrial facility added. - {industrialFacilityDto.Name}");
        }

        public async Task<IEnumerable<IndustrialFacilityDto>> GetFacilitiesInfo()
        {
            var facilities = await _industrialFacilityRepository.GetAllAsync();
            
            var facilitiesDto = _mapper.Map<IEnumerable<IndustrialFacilityDto>>(facilities);
            
            _logger.LogInformation("Industrial facilities retrieved.");
            
            return facilitiesDto;
        }
        
        public async Task<IndustrialFacilityDto> GetFacilityById(long id)
        {
            var facility = await _industrialFacilityRepository.GetByIdAsync(id);
            if (facility == null)
                throw new EntityNotFoundException();

            var facilityDto = _mapper.Map<IndustrialFacilityDto>(facility);
            
            _logger.LogInformation($"Industrial facility retrieved. - {id}");
            
            return facilityDto;
        }

        public async Task DeleteFacility(long id)
        {
            var facility = await _industrialFacilityRepository.GetByIdAsync(id);
            if (facility == null) 
                throw new EntityNotFoundException();

            await _industrialFacilityRepository.DeleteAsync(facility);
            
            _logger.LogInformation($"Industrial facility deleted. - {id}");
        }

        public async Task UpdateFacility(IndustrialFacilityDto industrialFacilityDto)
        {
            var industrialFacilityExist = await _industrialFacilityRepository.GetByIdAsync(industrialFacilityDto.Id);
            if(industrialFacilityExist == null)
                throw new EntityNotFoundException();

            var facility = _mapper.Map<IndustrialFacility>(industrialFacilityDto);

            await _industrialFacilityRepository.UpdateAsync(facility);
            
            _logger.LogInformation($"Industrial facility updated. - {industrialFacilityDto.Name}");
        }
    }
}