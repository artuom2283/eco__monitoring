namespace server.DTOs;

public class UpdateReportDto
{
    public long Id { get; set; }
    public int Year { get; set; }
    public float Volume { get; set; }
    public float TaxRate { get; set; }
    public string TaxType { get; set; }
    public float TaxAmount { get; set; }
}