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
    public class PollutionService : IPollutionService
    {
        private readonly IPollutionRepository _pollutionRepository;

        public PollutionService(IPollutionRepository pollutionRepository)
        {
            _pollutionRepository = pollutionRepository;
        }

        public async Task<bool> AddPollution(PollutionDto pollutionDto)
        {
            if (pollutionDto == null) return false;

            var pollution = new Pollution
            {
                Id = pollutionDto.Id,
                Name = pollutionDto.Name,
                Volume = pollutionDto.Volume,
                Tax = pollutionDto.Tax,
                MassFlowRate = pollutionDto.MassFlowRate,
                EmissionsLimit = pollutionDto.EmissionsLimit,
                IndustrialFacilityId = pollutionDto.IndustrialFacilityId,
            };

            return await _pollutionRepository.InsertAsync(pollution);
        }

        public async Task<bool> DeletePollution(long id)
        {
            var pollution = await _pollutionRepository.GetByIdAsync(id);

            if (pollution == null) return false;

            return await _pollutionRepository.DeleteAsync(pollution);
        }

        public async Task<IEnumerable<PollutionDto>> GetAllPollution()
        {
            var pollutions = await _pollutionRepository.GetAllAsync();

            if (pollutions == null) return null;

            var pollutionsDto = new List<PollutionDto>();
            foreach (var pollution in pollutions)
            {
                var pollutionDto = new PollutionDto
                {
                    Id = pollution.Id,
                    Name = pollution.Name,
                    Volume = pollution.Volume,
                    Tax = pollution.Tax,
                    MassFlowRate = pollution.MassFlowRate,
                    EmissionsLimit = pollution.EmissionsLimit,
                    IndustrialFacilityId = pollution.IndustrialFacilityId,
                };
                pollutionsDto.Add(pollutionDto);
            }

            return pollutionsDto;
        }

        public async Task<PollutionDto> GetPollutionById(long id)
        {
            var pollution = await _pollutionRepository.GetByIdAsync(id);

            if (pollution == null) return null;

            return new PollutionDto
            {
                Id = pollution.Id,
                Name = pollution.Name,
                Volume = pollution.Volume,
                Tax = pollution.Tax,
                MassFlowRate = pollution.MassFlowRate,
                EmissionsLimit = pollution.EmissionsLimit,
                IndustrialFacilityId = pollution.IndustrialFacilityId,
            };
        }

        public async Task<bool> UpdatePollution(PollutionDto pollutionDto)
        {
            if (pollutionDto == null) return false;

            var pollution = new Pollution
            {
                Id = pollutionDto.Id,
                Name = pollutionDto.Name,
                Volume = pollutionDto.Volume,
                Tax = pollutionDto.Tax,
                MassFlowRate = pollutionDto.MassFlowRate,
                EmissionsLimit = pollutionDto.EmissionsLimit,
                IndustrialFacilityId = pollutionDto.IndustrialFacilityId,
            };

            return await _pollutionRepository.DeleteAsync(pollution);
        }
    }
}