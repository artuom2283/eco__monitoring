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
        Task<bool> AddPollution(PollutionDto pollutionDto);
        Task<bool> UpdatePollution(PollutionDto pollutionDto);
        Task<bool> DeletePollution(long id);
    }
}