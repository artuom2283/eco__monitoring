namespace server.DTOs;

public class RiskDto
{
    public long Id { get; set; }
    public string SubstanceName { get; set; }
    public string CalculationType { get; set; }
    public float Result { get; set; }
}