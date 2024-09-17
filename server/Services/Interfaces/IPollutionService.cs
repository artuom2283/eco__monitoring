using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using server.DTO;

namespace server.Services.Interfaces
{
    public interface IPollutionService
    {
        Task<IEnumerable<PollutionDto>> GetAllPollution();
        Task<PollutionDto> GetPollutionById(long id);
        Task AddPollution(PollutionDto pollutionDto);
        Task UpdatePollution(PollutionDto pollutionDto);
        Task DeletePollution(long id);
    }
}