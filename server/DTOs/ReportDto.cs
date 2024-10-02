namespace server.DTOs;

public class ReportDto
{
    public int Id { get; set; }
    public string FacilityName { get; set; }
    public string PollutionName { get; set; }
    public int Year { get; set; }
    public float Volume { get; set; }
    public float MassFlowRate { get; set; }
    public float EmissionsLimit { get; set; }
    public float WaterTax { get; set; }
    public float AirTax { get; set; }
    public float TotalTax { get; set; }
}