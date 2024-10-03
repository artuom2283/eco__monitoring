using Microsoft.AspNetCore.Mvc;
using server.DTOs;
using server.Services.Interfaces;

namespace server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CalculationController : ControllerBase
{
    private readonly ICalculationService _calculationService;
    
    public CalculationController(
        ICalculationService calculationService)
    {
        _calculationService = calculationService;
    }
    
    [HttpGet("/calculations/air-tax")]
    public async Task<FullCalculationDto> CalulateAirTax(string facilityName, int? year)
    {
        return await _calculationService.CalulateAirTax(facilityName, year);
    }
}