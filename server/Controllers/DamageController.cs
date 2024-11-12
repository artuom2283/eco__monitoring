using FluentValidation;
using Microsoft.AspNetCore.Mvc;
using server.DTOs;
using server.Responses;
using server.Services.Interfaces;

namespace server.Controllers;

[ApiController]
[Route("api/")]
public class DamageController : ControllerBase
{
    private readonly IDamageService _damageService;
    private readonly IValidator<DamageDto> _validator;

    public DamageController(IDamageService damageService, IValidator<DamageDto> validator)
    {
        _validator = validator;
        _damageService = damageService;
    }
    
    [HttpGet("damages")]
    [ProducesResponseType(type: typeof(IEnumerable<DamageDto>), StatusCodes.Status200OK)]
    public async Task<ActionResult<IEnumerable<DamageDto>>> GetDamages()
    {
        var damages = await _damageService.GetAllDamages();

        return Ok(damages);
    }

    [HttpPost("damages")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(type: typeof(ValidationResponse), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status409Conflict)]
    public async Task<ActionResult> AddDamage(DamageDto damage)
    {
        var validationResult = await _validator.ValidateAsync(damage);
        if (validationResult.IsValid == false)
            return BadRequest(new ValidationResponse
            {
                StatusCode = 400,
                Errors = validationResult.Errors
            });

        await _damageService.AddDamage(damage);

        return Ok();
    }
    
    [HttpDelete("damages/{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult> DeleteDamage([FromRoute] long id)
    {
        await _damageService.DeleteDamage(id);

        return Ok();
    }
}