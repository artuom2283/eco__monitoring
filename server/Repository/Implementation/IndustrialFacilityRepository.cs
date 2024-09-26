using System;
using System.Collections;
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

        public async Task InsertAsync(IndustrialFacility facility)
        {
            _context.Facilities.Add(facility);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(IndustrialFacility facility)
        {
            _context.Facilities.Remove(facility);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(IndustrialFacility facility)
        {
            var existingFacility = await _context.Facilities.FindAsync(facility.Id);
            
            existingFacility.Name = facility.Name;
            
            await _context.SaveChangesAsync();
        }

        public async Task<IndustrialFacility> GetByIdAsync(long id)
        {
            return await _context.Facilities.FindAsync(id);
        }

        public async Task<IEnumerable<FullIndustrialFacilityDto>> GetFacilityWithPollutionAsync()
        {
            using (var connection = _context.Database.GetDbConnection())
            {
                if (connection.State == System.Data.ConnectionState.Closed)
                {
                    await connection.OpenAsync();
                }

                var sqlQuery = @"
                SELECT i.id AS Id, i.name AS FacilityName, p.id as PollutionId, p.year as Year, p.Name AS PollutionName, p.Volume as Volume, p.Tax as Tax,
	 p.mass_flow_rate as MassFlowRate,
                    p.emissions_limit as EmissionsLimit
                FROM public.industrial_facilities i
                INNER JOIN public.pollutions p ON i.id = p.industrial_facility_id;";

                return await connection.QueryAsync<FullIndustrialFacilityDto>(sqlQuery);
            }
        }

        public async Task<IEnumerable<FullIndustrialFacilityDto>> GetFacilityWithPollutionByNameAsync(string name)
        {
            using (var connection = _context.Database.GetDbConnection())
            {
                if (connection.State == System.Data.ConnectionState.Closed)
                {
                    await connection.OpenAsync();
                }

                var sqlQuery = @"
                SELECT i.id AS Id, i.name AS FacilityName, p.id as PollutionId, p.year as Year, p.Name AS PollutionName, p.Volume as Volume, p.Tax as Tax,
	 p.mass_flow_rate as MassFlowRate,
                    p.emissions_limit as EmissionsLimit
                FROM public.industrial_facilities i
                INNER JOIN public.pollutions p ON i.id = p.industrial_facility_id WHERE i.name = @name;";

                return await connection.QueryAsync<FullIndustrialFacilityDto>(sqlQuery, new {name});
            }
        }

        public async Task<IEnumerable<FullIndustrialFacilityDto>> GetFacilityWithPollutionSortByAscendingAsync()
        {
            using (var connection = _context.Database.GetDbConnection())
            {
                if (connection.State == System.Data.ConnectionState.Closed)
                {
                    await connection.OpenAsync();
                }

                var sqlQuery = @"
                SELECT i.id AS Id, i.name AS FacilityName, p.id as PollutionId, p.year as Year, p.Name AS PollutionName, p.Volume as Volume, p.Tax as Tax,
	 p.mass_flow_rate as MassFlowRate,
                    p.emissions_limit as EmissionsLimit
                FROM public.industrial_facilities i
                INNER JOIN public.pollutions p ON i.id = p.industrial_facility_id ORDER BY p.Volume ASC;";

                return await connection.QueryAsync<FullIndustrialFacilityDto>(sqlQuery);
            }
        }
        
        public async Task<IEnumerable<FullIndustrialFacilityDto>> GetFacilityWithPollutionSortByDescendingAsync()
        {
            using (var connection = _context.Database.GetDbConnection())
            {
                if (connection.State == System.Data.ConnectionState.Closed)
                {
                    await connection.OpenAsync();
                }

                var sqlQuery = @"
                SELECT i.id AS Id, i.name AS FacilityName, p.id as PollutionId, p.year as Year, p.Name AS PollutionName, p.Volume as Volume, p.Tax as Tax,
	 p.mass_flow_rate as MassFlowRate,
                    p.emissions_limit as EmissionsLimit
                FROM public.industrial_facilities i
                INNER JOIN public.pollutions p ON i.id = p.industrial_facility_id ORDER BY p.Volume DESC;";

                return await connection.QueryAsync<FullIndustrialFacilityDto>(sqlQuery);
            }
        }
        
        

        public async Task<IndustrialFacility> GetByNameAsync(string name)
        {
            return await _context.Facilities.FirstOrDefaultAsync(f => f.Name == name);
        }
    }
}