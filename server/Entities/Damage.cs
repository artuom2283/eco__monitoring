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
}