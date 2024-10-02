using System.ComponentModel.DataAnnotations.Schema;

namespace server.Entities;

[Table("reports")]
public class Report
{
    [Column("id")]
    public long Id { get; set; }
    [Column("industrial_facility_id")]
    public long IndustrialFacilityId { get; set; }
    public IndustrialFacility IndustrialFacility { get; set; }
    [Column("pollution_id")]
    public long PollutionId { get; set; }
    public Pollution Pollution { get; set; }
    [Column("year")]
    public int Year { get; set; }
    [Column("volume")]
    public float Volume { get; set; }
    [Column("water_tax")]
    public float? WaterTax { get; set; }
    [Column("air_tax")]
    public float? AirTax { get; set; }
    [Column("total_tax")]
    public float? TotalTax { get; set; }
}