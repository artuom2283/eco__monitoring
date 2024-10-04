using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Entities;
using server.Repository.Base;
using server.Repository.Interfaces;

namespace server.Repository
{
    public class PollutionRepository : IPollutionRepository
    {
        private readonly DatabaseContext _context;

        public PollutionRepository(DatabaseContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Pollution>> GetAllAsync()
        {
            return await _context.Pollutions.ToListAsync();
        }

        public async Task<long> GetIdByNameAsync(string name)
        {
            var pollution = await _context.Pollutions.FirstOrDefaultAsync(p => p.Name == name);

            return pollution.Id;
        }

        public async Task InsertAsync(Pollution pollution)
        {
            _context.Pollutions.Add(pollution);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(Pollution pollution)
        {
            _context.Pollutions.Remove(pollution);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(Pollution pollution)
        {
            var existingPollution = await _context.Pollutions.FindAsync(pollution.Id);
            
            existingPollution.Name = pollution.Name;
            existingPollution.MassFlowRate = pollution.MassFlowRate;
            existingPollution.EmissionsLimit = pollution.EmissionsLimit;
            existingPollution.DangerClass = pollution.DangerClass;
            
            await _context.SaveChangesAsync();
        }

        public async Task<Pollution> GetByIdAsync(long id)
        {
            return await _context.Pollutions.FindAsync(id);
        }
        
        public async Task<Pollution> GetByNameAsync(string name)
        {
            return await _context.Pollutions.FirstOrDefaultAsync(p => p.Name == name);
        }
    }
}