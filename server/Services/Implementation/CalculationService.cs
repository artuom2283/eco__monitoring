using server.DTOs;
using server.Repository.Interfaces;
using server.Services.Interfaces;

namespace server.Services;

public class CalculationService : ICalculationService
{
    private readonly IReportRepository _reportRepository;
    private readonly ILogger<CalculationService> _logger;
    
    public CalculationService(
        IReportRepository reportRepository,
        ILogger<CalculationService> logger)
    {
        _reportRepository = reportRepository;
        _logger = logger;
    }
    
    public async Task<FullCalculationDto> CalulateAirTax(string facilityName, int? year)
    {
        var fullCalculationDto = new FullCalculationDto();
        var allReports = await _reportRepository.GetReportsByNameAsync(facilityName);
        if (year == null)
        {
            var result = allReports.Select(x => new CalculationDto()
            {
                PollutionName = x.PollutionName,
                PollutionTax = allReports.Where(r => r.PollutionName == x.PollutionName).Sum(r => r.AirTax * r.Volume),
                Year = x.Year
            });
            
            _logger.LogInformation("Calculating air tax for facility {facilityName}", facilityName);

            fullCalculationDto.Calculations = result;
            fullCalculationDto.TotalTax = result.Sum(r => r.PollutionTax);
            
            return fullCalculationDto;
        }
        else
        {
            var reportsWithYear = allReports.Where(r => r.Year == year);
            
            var result = reportsWithYear.Select(x => new CalculationDto()
            {
                PollutionName = x.PollutionName,
                PollutionTax = reportsWithYear.Where(r => r.PollutionName == x.PollutionName).Sum(r => r.AirTax * r.Volume),
                Year = x.Year
            });
            
            _logger.LogInformation("Calculating air tax for facility {facilityName}", facilityName);

            fullCalculationDto.Calculations = result;
            fullCalculationDto.TotalTax = result.Sum(r => r.PollutionTax);
            
            return fullCalculationDto;
        }
    }
}