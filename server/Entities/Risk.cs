using System.ComponentModel.DataAnnotations.Schema;

namespace server.Entities;

[Table("risks")]
public class Risk
{
    [Column("id")]
    public long Id { get; set; }
    [Column("substance_name")]
    public string SubstanceName { get; set; } = string.Empty;
    [Column("calculation_type")]
    public string CalculationType { get; set; } = string.Empty;
    [Column("result")]
    public float Result { get; set; }
}