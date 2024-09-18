using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.DTO
{
    public class FullIndustrialFacilityDto
    {
        public long Id { get; set; }
        public int Year { get; set; }
        public long PollutionId { get; set; }
        public string FacilityName { get; set; }
        public string PollutionName { get; set; }
        public float Volume { get; set; }
        public float Tax { get; set; }
        public float MassFlowRate { get; set; }
        public float EmissionsLimit { get; set; }
    }
}