using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.DTO;
using server.Entities;
using server.Repository.Interfaces;

namespace server.Repository
{
    public class IndustrialFacilityRepository : IIndustrialFacilityRepository
    {

        private readonly DatabaseContext _context;

        public IndustrialFacilityRepository(DatabaseContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<IndustrialFacility>> GetAllAsync()
        {
            return await _context.Facilities.ToListAsync();
        }

        public async Task<bool> InsertAsync(IndustrialFacility facility)
        {
            if (facility != null)
            {
                _context.Facilities.Add(facility);
                return await _context.SaveChangesAsync() > 0;
            }
            return false;
        }

        public async Task<bool> DeleteAsync(IndustrialFacility facility)
        {
            if (facility != null)
            {
                _context.Facilities.Remove(facility);
                return await _context.SaveChangesAsync() > 0;
            }

            return false;
        }

        public async Task<bool> UpdateAsync(IndustrialFacility facility)
        {
            if (facility != null)
            {
                _context.Facilities.Update(facility);
                return await _context.SaveChangesAsync() > 0;
            }
            return false;
        }

        public async Task<IndustrialFacility> GetByIdAsync(long id)
        {
            return await _context.Facilities.FindAsync(id);
        }

        public async Task<IEnumerable<FullIndustrialFacilityDTO>> GetFacilityWithPollutionAsync()
        {
            var sqlQuery = @"
            SELECT 
                i.Id AS Id,
                i.Name AS FacilityName,
                p.Name AS PollutionName,
                p.Volume,
                p.Tax,
                p.MassFlowRate,
                p.EmissionsLimit
            FROM IndustrialFacility i
            INNER JOIN Pollution p ON i.Id = p.IndustrialFacilityId";

            using var connection = _context.Database.GetDbConnection();

            if (connection.State == System.Data.ConnectionState.Closed)
            {
                await connection.OpenAsync();
            }

            var result = await connection.QueryAsync<FullIndustrialFacilityDTO>(sqlQuery);
            return result;
        }
    }
}