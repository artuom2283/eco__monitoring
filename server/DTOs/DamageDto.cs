namespace server.DTOs;

public class DamageDto
{
    public long Id { get; set; }
    public string Type { get; set; } = String.Empty;
    public float Result {get; set;}
}