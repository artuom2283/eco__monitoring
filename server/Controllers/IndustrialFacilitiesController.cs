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
    public class IndustrialFacilitiesController : ControllerBase
    {
        private readonly IIndustrialFacilityService _industrialFacilityService;
        private readonly IndustrialFacilityValidator _facilityValidator;
        private readonly SearchValidator _searchValidator;

        public IndustrialFacilitiesController(
            IIndustrialFacilityService industrialFacilityService,
            IndustrialFacilityValidator facilityValidator,
            SearchValidator searchValidator)
        {
            _industrialFacilityService = industrialFacilityService;
            _facilityValidator = facilityValidator;
            _searchValidator = searchValidator;
        }

        [HttpGet("/fullFacilities")]
        public async Task<ActionResult<IEnumerable<FullIndustrialFacilityDto>>> GetFullFacilities()
        {
            var fullFacilitiesDto = await _industrialFacilityService.GetFullFacilitiesInfo();

            return Ok(fullFacilitiesDto);
        }
        
        [HttpGet("/fullFacilities/{name}")]
        public async Task<ActionResult<IEnumerable<FullIndustrialFacilityDto>>> GetFullFacilitiesByName([FromRoute] string name)
        {
            var fullFacilitiesDto = await _industrialFacilityService.GetFullFacilitiesInfoByName(name);

            return Ok(fullFacilitiesDto);
        }
        
        [HttpGet("/fullFacilities/sortByAscending")]
        public async Task<ActionResult<IEnumerable<FullIndustrialFacilityDto>>> GetFullFacilitiesSortByAscending()
        {
            var fullFacilitiesDto = await _industrialFacilityService.GetFullFacilitiesInfoSortByAscending();

            return Ok(fullFacilitiesDto);
        }
        
        [HttpGet("/fullFacilities/sortByDescending")]
        public async Task<ActionResult<IEnumerable<FullIndustrialFacilityDto>>> GetFullFacilitiesSortByDescending()
        {
            var fullFacilitiesDto = await _industrialFacilityService.GetFullFacilitiesInfoSortByDescending();

            return Ok(fullFacilitiesDto);
        }

        [HttpGet("/facilities")]
        public async Task<ActionResult<IEnumerable<IndustrialFacilityDto>>> GetFacilities()
        {
            var facilitiesDto = await _industrialFacilityService.GetFacilitiesInfo();

            return Ok(facilitiesDto);
        }

        [HttpGet("/facilities/{id}")]
        public async Task<ActionResult<IEnumerable<IndustrialFacilityDto>>> GetFacility([FromRoute] long id)
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

                var facilityDto = await _industrialFacilityService.GetFacilityById(id);

                return Ok(facilityDto);
            }
            catch (EntityNotFoundException ex)
            {
                return StatusCode(StatusCodes.Status404NotFound, ex.Message);
            }
        }

        [HttpPost("/facilities")]
        public async Task<ActionResult> AddNewFacility(IndustrialFacilityDto industrialFacilityDto)
        {
            try
            {
                var validationResult = await _facilityValidator.ValidateAsync(industrialFacilityDto);
                if (validationResult.IsValid == false)
                    return BadRequest(new ValidationResponse
                    {
                        StatusCode = 400,
                        Errors = validationResult.Errors
                    });

                await _industrialFacilityService.AddFacility(industrialFacilityDto);

                return Ok(industrialFacilityDto);
            }
            catch (EntityAlreadyExistsException ex)
            {
                return StatusCode(StatusCodes.Status409Conflict, ex.Message);
            }
        }

        [HttpPut("/facilities")]
        public async Task<ActionResult> UpdateFacility(IndustrialFacilityDto industrialFacilityDto)
        {
            try
            {
                var validationResult = await _facilityValidator.ValidateAsync(industrialFacilityDto);
                if (validationResult.IsValid == false)
                    return BadRequest(new ValidationResponse
                    {
                        StatusCode = 400,
                        Errors = validationResult.Errors
                    });

                await _industrialFacilityService.UpdateFacility(industrialFacilityDto);

                return Ok(industrialFacilityDto);
            }
            catch (EntityNotFoundException ex)
            {
                return StatusCode(StatusCodes.Status404NotFound, ex.Message);
            }
        }

        [HttpDelete("/facilities/{id}")]
        public async Task<ActionResult> DeleteFacility([FromRoute] long id)
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

                await _industrialFacilityService.DeleteFacility(id);

                return Ok(id);
            }
            catch (EntityNotFoundException ex)
            {
                return StatusCode(StatusCodes.Status404NotFound, ex.Message);
            }
        }
    }
}