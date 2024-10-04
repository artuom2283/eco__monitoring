using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using server.Entities;
using server.Repository.Base;

namespace server.Repository.Interfaces
{
    public interface IIndustrialFacilityRepository : IBaseRepository<IndustrialFacility>
    {
        Task<IndustrialFacility> GetByNameAsync(string name);
        Task<long> GetFacilityIdByNameAsync(string name);
    }
}