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
        private readonly ILogger<PollutionRepository> _logger;

        public PollutionRepository(DatabaseContext context,
            ILogger<PollutionRepository> logger)
        {
            _context = context;
            _logger = logger;
        }

        public async Task<IEnumerable<Pollution>> GetAllAsync()
        {
            var pollutions = await _context.Pollutions.ToListAsync();
            
            _logger.LogInformation("Pollutions were fetched from the database");
            
            return pollutions;
        }

        public async Task<long> GetIdByNameAsync(string name)
        {
            var pollution = await _context.Pollutions.FirstOrDefaultAsync(p => p.Name == name);

            _logger.LogInformation("Pollution Id was fetched from the database by name");
            
            return pollution.Id;
        }

        public async Task InsertAsync(Pollution pollution)
        {
            _context.Pollutions.Add(pollution);
            await _context.SaveChangesAsync();
            
            _logger.LogInformation("Pollution was added to the database");
        }

        public async Task DeleteAsync(Pollution pollution)
        {
            _context.Pollutions.Remove(pollution);
            await _context.SaveChangesAsync();
            
            _logger.LogInformation("Pollution was deleted from the database");
        }

        public async Task UpdateAsync(Pollution pollution)
        {
            var existingPollution = await _context.Pollutions.FindAsync(pollution.Id);
            
            existingPollution.Name = pollution.Name;
            existingPollution.MassFlowRate = pollution.MassFlowRate;
            existingPollution.EmissionsLimit = pollution.EmissionsLimit;
            existingPollution.DangerClass = pollution.DangerClass;
            
            await _context.SaveChangesAsync();
            
            _logger.LogInformation("Pollution was updated in the database");
        }

        public async Task<Pollution> GetByIdAsync(long id)
        {
            var pollution = await _context.Pollutions.FindAsync(id);
            
            _logger.LogInformation("Pollution was fetched from the database");
            
            return pollution;
        }
        
        public async Task<Pollution> GetByNameAsync(string name)
        {
            var pollution = await _context.Pollutions.FirstOrDefaultAsync(p => p.Name == name);
            
            _logger.LogInformation("Pollution was fetched from the database by name");
            
            return pollution;
        }
    }
}