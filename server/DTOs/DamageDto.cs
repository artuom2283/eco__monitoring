namespace server.DTOs;

public class DamageDto
{
    public long Id { get; set; }
    public string Type { get; set; } = String.Empty;
    public long IndustrialFacilityId { get; set; }
    public long PollutionId { get; set; }
    public int Year { get; set; }
    public float Result {get; set;}
}