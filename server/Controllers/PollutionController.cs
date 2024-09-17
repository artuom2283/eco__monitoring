using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FluentValidation;
using Microsoft.AspNetCore.Mvc;
using server.DTO;
using server.Exceptions;
using server.Responses;
using server.Services.Interfaces;
using server.Validators;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PollutionController : ControllerBase
    {
        private readonly IPollutionService _pollutionService;
        private readonly PollutionValidator _pollutionValidator;
        private readonly SearchValidator _searchValidator;

        public PollutionController(
            IPollutionService pollutionService,
            PollutionValidator pollutionValidator,
            SearchValidator searchValidator)
        {
            _pollutionService = pollutionService;
            _pollutionValidator = pollutionValidator;
            _searchValidator = searchValidator;
        }

        [HttpGet("/pollutions")]
        public async Task<ActionResult<IEnumerable<PollutionDto>>> GetPollutions()
        {
            var pollutions = await _pollutionService.GetAllPollution();

            return Ok(pollutions);
        }

        [HttpGet("/pollutions/{id}")]
        public async Task<ActionResult<PollutionDto>> GetPollution([FromRoute] long id)
        {
            try
            {
                var validationResult = await _searchValidator.ValidateAsync(id);
                if (validationResult.IsValid == false)
                    return BadRequest(new ValidationResponse
                    {
                        StatusCode = 400,
                        Errors = validationResult.Errors
                    });

                var pollutionDto = await _pollutionService.GetPollutionById(id);

                return Ok(pollutionDto);
            }
            catch (EntityNotFoundException ex)
            {
                return StatusCode(StatusCodes.Status404NotFound, ex.Message);
            }
        }

        [HttpPost("/pollutions")]
        public async Task<ActionResult> AddPollution(PollutionDto pollutionDto)
        {
            var validationResult = await _pollutionValidator.ValidateAsync(pollutionDto);
            if (validationResult.IsValid == false)
                return BadRequest(new ValidationResponse
                {
                    StatusCode = 400,
                    Errors = validationResult.Errors
                });

            await _pollutionService.AddPollution(pollutionDto);

            return Ok(pollutionDto);
        }

        [HttpPut("/pollutions")]
        public async Task<ActionResult> UpdatePollution(PollutionDto pollutionDto)
        {
            try
            {
                var validationResult = await _pollutionValidator.ValidateAsync(pollutionDto);
                if (validationResult.IsValid == false)
                    return BadRequest(new ValidationResponse
                    {
                        StatusCode = 400,
                        Errors = validationResult.Errors
                    });

                await _pollutionService.UpdatePollution(pollutionDto);

                return Ok(pollutionDto);
            }
            catch (EntityNotFoundException ex)
            {
                return StatusCode(StatusCodes.Status404NotFound, ex.Message);
            }
        }

        [HttpDelete("/pollutions/{id}")]
        public async Task<ActionResult> DeletePollution([FromRoute] long id)
        {
            try
            {
                var validationResult = await _searchValidator.ValidateAsync(id);
                if (validationResult.IsValid == false)
                    return BadRequest(new ValidationResponse
                    {
                        StatusCode = 400,
                        Errors = validationResult.Errors
                    });

                await _pollutionService.DeletePollution(id);

                return Ok(id);
            }
            catch (EntityNotFoundException ex)
            {
                return StatusCode(StatusCodes.Status404NotFound, ex.Message);
            }
        }
    }
}