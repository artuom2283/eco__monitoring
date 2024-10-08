namespace server.DTOs;

public class ReportDto
{
    public long Id { get; set; }
    public long IndustrialFacilityId { get; set; }
    public long PollutionId { get; set; }
    public int Year { get; set; }
    public float Volume { get; set; }
    public float TaxRate { get; set; }
    public string TaxType { get; set; }
}