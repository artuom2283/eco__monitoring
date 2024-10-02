using Microsoft.AspNetCore.Mvc;
using server.DTOs;
using server.Exceptions;
using server.Responses;
using server.Services.Interfaces;
using server.Validators;

namespace server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ReportController : ControllerBase
{
    private readonly IReportService _reportService;
    private readonly ReportValidator _reportValidator;
    private readonly SearchValidator _searchValidator;

    public ReportController(
        IReportService reportService,
        ReportValidator reportValidator,
        SearchValidator searchValidator)
    {
        _reportService = reportService;
        _reportValidator = reportValidator;
        _searchValidator = searchValidator;
    }

    [HttpGet("/reports")]
    public async Task<ActionResult<IEnumerable<ReportDto>>> GetReports()
    {
        var reports = await _reportService.GetAllReports();

        return Ok(reports);
    }

    [HttpGet("/reports/name-{name}")]
    public async Task<ActionResult<IEnumerable<ReportDto>>> GetReportsByName([FromRoute] string name)
    {
        try
        {
            var reports = await _reportService.GetReportsByName(name);

            return Ok(reports);
        }
        catch (ArgumentException ex)
        {
            return StatusCode(StatusCodes.Status400BadRequest, ex.Message);
        }
    }

    [HttpGet("/reports/sort/{param}-{orderBy}")]
    public async Task<ActionResult<IEnumerable<ReportDto>>> GetReportsSorted([FromRoute] string param,
        [FromRoute] string orderBy)
    {
        try
        {
            var reports = await _reportService.GetSortedReports(param, orderBy);

            return Ok(reports);
        }
        catch (ArgumentException ex)
        {
            return StatusCode(StatusCodes.Status400BadRequest, ex.Message);
        }
    }


    [HttpGet("/reports/{id}")]
    public async Task<ActionResult<ReportDto>> GetReport([FromRoute] long id)
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

            var reportDto = await _reportService.GetReportById(id);

            return Ok(reportDto);
        }
        catch (EntityNotFoundException ex)
        {
            return StatusCode(StatusCodes.Status404NotFound, ex.Message);
        }
    }

    [HttpPost("/reports")]
    public async Task<ActionResult> AddReport(ReportDto reportDto)
    {
        var validationResult = await _reportValidator.ValidateAsync(reportDto);
        if (validationResult.IsValid == false)
            return BadRequest(new ValidationResponse
            {
                StatusCode = 400,
                Errors = validationResult.Errors
            });

        await _reportService.AddReport(reportDto);

        return Ok();
    }

    [HttpPut("/reports")]
    public async Task<ActionResult> UpdateReport(ReportDto reportDto)
    {
        try
        {
            var validationResult = await _reportValidator.ValidateAsync(reportDto);
            if (validationResult.IsValid == false)
                return BadRequest(new ValidationResponse
                {
                    StatusCode = 400,
                    Errors = validationResult.Errors
                });

            await _reportService.UpdateReport(reportDto);

            return Ok();
        }
        catch (EntityNotFoundException ex)
        {
            return StatusCode(StatusCodes.Status404NotFound, ex.Message);
        }
    }

    [HttpDelete("/reports/{id}")]
    public async Task<ActionResult> DeleteReport([FromRoute] long id)
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

            await _reportService.DeleteReport(id);

            return Ok();
        }
        catch (EntityNotFoundException ex)
        {
            return StatusCode(StatusCodes.Status404NotFound, ex.Message);
        }
    }
}