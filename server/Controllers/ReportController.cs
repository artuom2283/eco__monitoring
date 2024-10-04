using Microsoft.AspNetCore.Mvc;
using server.DTOs;
using server.Exceptions;
using server.Responses;
using server.Services.Interfaces;
using server.Validators;

namespace server.Controllers;

[ApiController]
[Route("api/")]
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

    [HttpGet("reports")]
    [ProducesResponseType(type: typeof(IEnumerable<FullReportDto>), StatusCodes.Status200OK)]
    public async Task<ActionResult<IEnumerable<FullReportDto>>> GetReports()
    {
        var reports = await _reportService.GetAllReports();

        return Ok(reports);
    }

    [HttpGet("reports/name-{name}")]
    [ProducesResponseType(type: typeof(IEnumerable<FullReportDto>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<IEnumerable<FullReportDto>>> GetReportsByName([FromRoute] string name)
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

    [HttpGet("reports/sort/{param}-{orderBy}")]
    [ProducesResponseType(type: typeof(IEnumerable<FullReportDto>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<IEnumerable<FullReportDto>>> GetReportsSorted([FromRoute] string param,
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

    [HttpPost("reports")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(type: typeof(ValidationResponse), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status409Conflict)]
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

    [HttpPut("reports")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(type: typeof(ValidationResponse), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult> UpdateReport(ReportDto reportDto)
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

    [HttpDelete("reports/{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(type: typeof(ValidationResponse), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult> DeleteReport([FromRoute] long id)
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
}