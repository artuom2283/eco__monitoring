using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Entities
{
    public class IndustrialFacility
    {
        public long Id { get; set; }
        public string Name { get; set; }

        public List<Pollution> Pollutions { get; set; }
    }
}