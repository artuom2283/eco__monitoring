using Microsoft.AspNetCore.Mvc;
using server.Entities;
using server.Responses;
using server.Services.Interfaces;
using server.Validators;

namespace server.Controllers
{
    [ApiController]
    [Route("api/")]
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

        [HttpGet("facilities")]
        [ProducesResponseType(type: typeof(IndustrialFacility), StatusCodes.Status200OK)]
        public async Task<ActionResult<IEnumerable<IndustrialFacilityDto>>> GetFacilities()
        {
            var facilitiesDto = await _industrialFacilityService.GetFacilitiesInfo();

            return Ok(facilitiesDto);
        }

        [HttpGet("facilities/{id}")]
        [ProducesResponseType(type: typeof(IndustrialFacility), StatusCodes.Status200OK)]
        [ProducesResponseType(type: typeof(ValidationResponse), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<IndustrialFacilityDto>> GetFacility([FromRoute] long id)
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

        [HttpPost("facilities")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(type: typeof(ValidationResponse), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
        public async Task<ActionResult> AddNewFacility(IndustrialFacilityDto industrialFacilityDto)
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

        [HttpPut("facilities")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(type: typeof(ValidationResponse), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult> UpdateFacility(IndustrialFacilityDto industrialFacilityDto)
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

        [HttpDelete("facilities/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(type: typeof(ValidationResponse), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult> DeleteFacility([FromRoute] long id)
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
    }
}