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
        [Column("volume")]
        public float Volume { get; set; }
        [Column("tax")]
        public float Tax { get; set; }
        [Column("mass_flow_rate")]
        public float MassFlowRate { get; set; }
        [Column("emissions_limit")]
        public float EmissionsLimit { get; set; }

        [Column("industrial_facility_id")]
        public long IndustrialFacilityId { get; set; }
        public IndustrialFacility IndustrialFacility { get; set; }
    }
}