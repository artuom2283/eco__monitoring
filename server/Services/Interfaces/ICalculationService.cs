using server.DTOs;

namespace server.Services.Interfaces;

public interface ICalculationService
{
    Task<FullCalculationDto> CalulateAirTax(string facilityName, int? year);
}