using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using server.Entities;
using server.Exceptions;
using server.Repository.Interfaces;
using server.Services.Interfaces;

namespace server.Services
{
    public class PollutionService : IPollutionService
    {
        private readonly IPollutionRepository _pollutionRepository;
        private readonly IMapper _mapper;
        private readonly ILogger<PollutionService> _logger;

        public PollutionService(
            IPollutionRepository pollutionRepository,
            IMapper mapper,
            ILogger<PollutionService> logger)
        {
            _pollutionRepository = pollutionRepository;
            _mapper = mapper;
            _logger = logger;
        }

        public async Task AddPollution(PollutionDto pollutionDto)
        {
            var pollutionExist = await _pollutionRepository.GetByNameAsync(pollutionDto.Name);
            if (pollutionExist != null)
            {
                throw new EntityAlreadyExistsException();
            }

            var pollutionEntity = _mapper.Map<Pollution>(pollutionDto);

            await _pollutionRepository.InsertAsync(pollutionEntity);
            
            _logger.LogInformation($"Pollution added: {pollutionEntity.Id}");
        }

        public async Task DeletePollution(long id)
        {
            var pollution = await _pollutionRepository.GetByIdAsync(id);
            if (pollution == null)
                throw new EntityNotFoundException();

            await _pollutionRepository.DeleteAsync(pollution);
            
            _logger.LogInformation($"Pollution deleted: {pollution.Id}");
        }

        public async Task<IEnumerable<PollutionDto>> GetAllPollution()
        {
            var pollutions = await _pollutionRepository.GetAllAsync();

            var pollutionsDto = _mapper.Map<IEnumerable<PollutionDto>>(pollutions);
            
            _logger.LogInformation($"Pollutions retrieved: {pollutionsDto.Count()}");

            return pollutionsDto;
        }

        public async Task<PollutionDto> GetPollutionById(long id)
        {
            var pollution = await _pollutionRepository.GetByIdAsync(id);
            if (pollution == null)
                throw new EntityNotFoundException();

            var pollutionDto = _mapper.Map<PollutionDto>(pollution);
            
            _logger.LogInformation($"Pollution retrieved: {pollutionDto.Id}");

            return pollutionDto;
        }

        public async Task UpdatePollution(PollutionDto pollutionDto)
        {
            var pollutionExist = await _pollutionRepository.GetByIdAsync(pollutionDto.Id);
            if (pollutionExist == null)
                throw new EntityNotFoundException();

            var pollution = _mapper.Map<Pollution>(pollutionDto);

            await _pollutionRepository.UpdateAsync(pollution);
            
            _logger.LogInformation($"Pollution updated: {pollution.Id}");
        }
    }
}