using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace server.Entities
{
    [Table("pollutions")]
    public class Pollution
    {
        [Column("id")]
        public long Id { get; set; }
        [Column("name")]
        public string Name { get; set; }

        [Column("mass_flow_rate")]
        public float MassFlowRate { get; set; }
        [Column("danger_class")]
        public int DangerClass { get; set; }
        [Column("emissions_limit")]
        public float EmissionsLimit { get; set; }
        [Column("specific_emissions")]
        public float SpecificEmissions { get; set; }
        [Column("hazard_class_coefficient")]
        public int HazardClassCoefficient { get; set; }
        [Column("hazard_coefficient")]
        public float HazardCoefficient { get; set; }
    }
}