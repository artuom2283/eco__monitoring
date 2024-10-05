using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Entities;
using server.Repository.Base;
using server.Repository.Interfaces;

namespace server.Repository
{
    public class IndustrialFacilityRepository : IIndustrialFacilityRepository
    {
        private readonly DatabaseContext _context;
        private readonly ILogger<IndustrialFacilityRepository> _logger;

        public IndustrialFacilityRepository(DatabaseContext context,
            ILogger<IndustrialFacilityRepository> logger)
        {
            _context = context;
            _logger = logger;
        }

        public async Task<IEnumerable<IndustrialFacility>> GetAllAsync()
        {
            var facilities =  await _context.Facilities.ToListAsync();
            
            _logger.LogInformation("Facilities were fetched from the database");
            
            return facilities;
        }

        public async Task InsertAsync(IndustrialFacility facility)
        {
            _context.Facilities.Add(facility);
            await _context.SaveChangesAsync();
            
            _logger.LogInformation("Facility was added to the database");
        }

        public async Task DeleteAsync(IndustrialFacility facility)
        {
            _context.Facilities.Remove(facility);
            await _context.SaveChangesAsync();
            
            _logger.LogInformation("Facility was deleted from the database");
        }

        public async Task UpdateAsync(IndustrialFacility facility)
        {
            var existingFacility = await _context.Facilities.FindAsync(facility.Id);
            
            existingFacility.Name = facility.Name;
            
            await _context.SaveChangesAsync();
            
            _logger.LogInformation("Facility was updated in the database");
        }

        public async Task<IndustrialFacility> GetByIdAsync(long id)
        {
            var facility =  await _context.Facilities.FindAsync(id);
            
            _logger.LogInformation("Facility was fetched from the database");
            
            return facility;
        }
        
        public async Task<IndustrialFacility> GetByNameAsync(string name)
        {
            var facility = await _context.Facilities.FirstOrDefaultAsync(f => f.Name == name);
            
            _logger.LogInformation("Facility was fetched from the database by name");
            
            return facility;
        }
        
        public async Task<long> GetFacilityIdByNameAsync(string name)
        {
            var facility = await _context.Facilities.FirstOrDefaultAsync(f => f.Name == name);
            
            _logger.LogInformation("Facility id was fetched from the database by name");
            
            return facility.Id;
        }
    }
}