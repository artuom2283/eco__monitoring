using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.DTO
{
    public class PollutionDto
    {
        public long Id { get; set; }
        public long IndustrialFacilityId { get; set; }
        public int Year { get; set; }
        public string Name { get; set; }
        public float Volume { get; set; }
        public float Tax { get; set; }
        public float MassFlowRate { get; set; }
        public float EmissionsLimit { get; set; }
    }
}