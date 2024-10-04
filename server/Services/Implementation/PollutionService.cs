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

        public PollutionService(
            IPollutionRepository pollutionRepository,
            IMapper mapper)
        {
            _pollutionRepository = pollutionRepository;
            _mapper = mapper;
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
        }

        public async Task DeletePollution(long id)
        {
            var pollution = await _pollutionRepository.GetByIdAsync(id);
            if (pollution == null)
                throw new EntityNotFoundException();

            await _pollutionRepository.DeleteAsync(pollution);
        }

        public async Task<IEnumerable<PollutionDto>> GetAllPollution()
        {
            var pollutions = await _pollutionRepository.GetAllAsync();

            var pollutionsDto = _mapper.Map<IEnumerable<PollutionDto>>(pollutions);

            return pollutionsDto;
        }

        public async Task<PollutionDto> GetPollutionById(long id)
        {
            var pollution = await _pollutionRepository.GetByIdAsync(id);
            if (pollution == null)
                throw new EntityNotFoundException();

            var pollutionDto = _mapper.Map<PollutionDto>(pollution);

            return pollutionDto;
        }

        public async Task UpdatePollution(PollutionDto pollutionDto)
        {
            var pollutionExist = await _pollutionRepository.GetByIdAsync(pollutionDto.Id);
            if (pollutionExist == null)
                throw new EntityNotFoundException();

            var pollution = _mapper.Map<Pollution>(pollutionDto);

            await _pollutionRepository.UpdateAsync(pollution);
        }
    }
}