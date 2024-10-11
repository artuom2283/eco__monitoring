namespace server.DTOs;

public class AddReportDto
{
    public long Id { get; set; }
    public long IndustrialFacilityId { get; set; }
    public long PollutionId { get; set; }
    public int Year { get; set; }
    public float Volume { get; set; }
    public float TaxRate { get; set; }
    public string TaxType { get; set; }
    public float TaxAmount { get; set; }
}