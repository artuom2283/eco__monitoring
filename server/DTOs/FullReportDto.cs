namespace server.DTOs;

public class FullReportDto
{
    public long Id { get; set; }
    public string FacilityName { get; set; }
    public string PollutionName { get; set; }
    public int Year { get; set; }
    public float Volume { get; set; }
    public float MassFlowRate { get; set; }
    public float EmissionsLimit { get; set; }
    public string TaxType { get; set; }
    public float TaxRate { get; set; }
    public float TaxAmount { get; set; }
    public float TaxByYear { get; set; }
}