using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.DTO
{
    public class FullIndustrialFacilityDTO
    {
        public long Id { get; set; }
        public string FacilityName { get; set; }
        public string PollutionName { get; set; }
        public long Volume { get; set; }
        public long Tax { get; set; }
        public long MassFlowRate { get; set; }
        public long EmissionsLimit { get; set; }
    }
}