public class PollutionDto
{
    public long Id { get; set; }
    public string Name { get; set; }
    public int DangerClass { get; set; }
    public float MassFlowRate { get; set; }
    public float EmissionsLimit { get; set; }
    public float SpecificEmissions { get; set; }
    public int HazardClassCoefficient { get; set; }
    public float HazardCoefficient { get; set; }
}