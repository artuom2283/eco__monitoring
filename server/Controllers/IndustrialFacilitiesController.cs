using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using server.DTO;
using server.Services.Interfaces;

namespace server.Controllers
{
    public class IndustrialFacilitiesController : BaseApiController
    {
        private readonly IIndustrialFacilityService _industrialFacilityService;

        public IndustrialFacilitiesController(IIndustrialFacilityService industrialFacilityService)
        {
            _industrialFacilityService = industrialFacilityService;
        }

        [HttpGet("fullFacilities")]
        public async Task<ActionResult<IEnumerable<FullIndustrialFacilityDTO>>> GetFullFacilities()
        {
            var fullFacilitiesDto = await _industrialFacilityService.GetFullFacilitiesInfo();

            if (fullFacilitiesDto == null) return NotFound();

            return Ok(fullFacilitiesDto);
        }

        [HttpGet("facilities")]
        public async Task<ActionResult<IEnumerable<IndustrialFacilityDto>>> GetFacilities()
        {
            var facilitiesDto = await _industrialFacilityService.GetFacilitiesInfo();

            if (facilitiesDto == null) return NotFound();

            return Ok(facilitiesDto);
        }

        [HttpGet("facility/{id}")]
        public async Task<ActionResult<IEnumerable<IndustrialFacilityDto>>> GetFacility(long id)
        {
            var facilityDto = await _industrialFacilityService.GetFacilityById(id);

            if (facilityDto == null) return NotFound();

            return Ok(facilityDto);
        }

        [HttpPost("addFacility")]
        public async Task<ActionResult> AddNewFacility(IndustrialFacilityDto industrialFacilityDto)
        {
            if (industrialFacilityDto == null) return BadRequest();

            var result = await _industrialFacilityService.AddFacility(industrialFacilityDto);

            if (result) return Ok(industrialFacilityDto);

            return BadRequest(new ProblemDetails { Title = "Problem adding new facility" });
        }

        [HttpPut("updateFacility")]
        public async Task<ActionResult> UpdateFacility(IndustrialFacilityDto industrialFacilityDto)
        {
            if (industrialFacilityDto == null) return BadRequest();

            var result = await _industrialFacilityService.UpdateFacility(industrialFacilityDto);

            if (result) return Ok(industrialFacilityDto);

            return BadRequest(new ProblemDetails { Title = "Problem updating facility" });
        }

        [HttpPut("deleteFacility/{id}")]
        public async Task<ActionResult> DeleteFacility(long id)
        {
            var result = await _industrialFacilityService.RemoveFacility(id);

            if (result) return Ok();

            return BadRequest(new ProblemDetails { Title = "Problem deleting facility" });
        }
    }

}