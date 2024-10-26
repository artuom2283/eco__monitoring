using Microsoft.AspNetCore.Mvc;
using server.DTOs;
using server.Responses;
using server.Services.Interfaces;
using server.Validators;

namespace server.Controllers;

[ApiController]
[Route("api/")]
public class RiskController : ControllerBase
{
    private readonly IRiskService _riskService;
    private readonly RiskValidator _riskValidator;

    public RiskController(IRiskService riskService, RiskValidator riskValidator)
    {
        _riskValidator = riskValidator;
        _riskService = riskService;
    }
    
     [HttpGet("risks")]
    [ProducesResponseType(type: typeof(IEnumerable<RiskDto>), StatusCodes.Status200OK)]
    public async Task<ActionResult<IEnumerable<RiskDto>>> GetRisks()
    {
        var risks = await _riskService.GetAllRisks();

        return Ok(risks);
    }

    [HttpPost("risks")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(type: typeof(ValidationResponse), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status409Conflict)]
    public async Task<ActionResult> AddReport(RiskDto riskDto)
    {
        var validationResult = await _riskValidator.ValidateAsync(riskDto);
        if (validationResult.IsValid == false)
            return BadRequest(new ValidationResponse
            {
                StatusCode = 400,
                Errors = validationResult.Errors
            });

        await _riskService.AddRisk(riskDto);

        return Ok();
    }
    
    [HttpDelete("risks/{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(type: typeof(ValidationResponse), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult> DeleteRisk([FromRoute] long id)
    {
        await _riskService.DeleteRisk(id);

        return Ok();
    }
}