using System.ComponentModel.DataAnnotations.Schema;

namespace server.Entities;

[Table("damages")]
public class Damage
{
    [Column("id")]
    public long Id { get; set; }
    [Column("type")]
    public string Type { get; set; } = String.Empty;
    [Column("result")]
    public float Result {get; set;}
    [Column("industrial_facility_id")]
    public long IndustrialFacilityId { get; set; }
    public IndustrialFacility IndustrialFacility { get; set; }
    [Column("pollution_id")]
    public long PollutionId { get; set; }
    public Pollution Pollution { get; set; }
    [Column("year")]
    public int Year { get; set; }
}