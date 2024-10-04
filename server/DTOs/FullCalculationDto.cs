namespace server.DTOs;

public class FullCalculationDto
{
    public IEnumerable<CalculationDto> Calculations { get; set; }
    public double TotalTax { get; set; }
}