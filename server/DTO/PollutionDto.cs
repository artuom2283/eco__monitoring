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
        public string Name { get; set; }
        public long Volume { get; set; }
        public long Tax { get; set; }
        public long MassFlowRate { get; set; }
        public long EmissionsLimit { get; set; }
    }
}