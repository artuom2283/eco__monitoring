using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using server.Entities;
using server.Repository.Base;

namespace server.Repository.Interfaces
{
    public interface IPollutionRepository : IBaseRepository<Pollution>
    {
        Task<Pollution> GetByNameAsync(string name);
        Task<long> GetIdByNameAsync(string name);
    }
}