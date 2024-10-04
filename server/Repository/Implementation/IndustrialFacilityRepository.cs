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
        
        public async Task<IndustrialFacility> GetByNameAsync(string name)
        {
            return await _context.Facilities.FirstOrDefaultAsync(f => f.Name == name);
        }
        
        public async Task<long> GetFacilityIdByNameAsync(string name)
        {
            var facility = await _context.Facilities.FirstOrDefaultAsync(f => f.Name == name);
            
            return facility.Id;
        }
    }
}