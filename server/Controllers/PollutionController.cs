using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using server.DTO;
using server.Services.Interfaces;

namespace server.Controllers
{
    public class PollutionController : BaseApiController
    {
        private readonly IPollutionService _pollutionService;

        public PollutionController(IPollutionService pollutionService)
        {
            _pollutionService = pollutionService;
        }

        [HttpGet("pollutions")]
        public async Task<ActionResult<IEnumerable<PollutionDto>>> GetPollutions()
        {
            var pollutions = await _pollutionService.GetAllPollution();

            if (pollutions == null) return NotFound();

            return Ok(pollutions);
        }

        [HttpGet("pollution/{id}")]
        public async Task<ActionResult<PollutionDto>> GetPollution(long id)
        {
            var pollutionDto = await _pollutionService.GetPollutionById(id);

            if (pollutionDto == null) return NotFound();

            return Ok(pollutionDto);
        }

        [HttpPost("addPollution")]
        public async Task<ActionResult> AddPollution(PollutionDto pollutionDto)
        {
            if (pollutionDto == null) return BadRequest();

            var result = await _pollutionService.AddPollution(pollutionDto);

            if (result) return Ok(pollutionDto);

            return BadRequest(new ProblemDetails { Title = "Problem adding new pollution" });
        }

        [HttpPut("updatePollution")]
        public async Task<ActionResult> UpdatePollution(PollutionDto pollutionDto)
        {
            if (pollutionDto == null) return BadRequest();

            var result = await _pollutionService.UpdatePollution(pollutionDto);

            if (result) return Ok(pollutionDto);

            return BadRequest(new ProblemDetails { Title = "Problem updating pollution" });
        }

        [HttpPut("deletePollution/{id}")]
        public async Task<ActionResult> DeletePollution(long id)
        {
            var result = await _pollutionService.DeletePollution(id);

            if (result) return Ok();

            return BadRequest(new ProblemDetails { Title = "Problem deleting pollution" });
        }
    }
}