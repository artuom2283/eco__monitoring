using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Entities;
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

        public async Task<bool> InsertAsync(Pollution pollution)
        {
            if (pollution != null)
            {
                _context.Pollutions.Add(pollution);
                return await _context.SaveChangesAsync() > 0;
            }
            return false;
        }

        public async Task<bool> DeleteAsync(Pollution pollution)
        {
            if (pollution != null)
            {
                _context.Pollutions.Remove(pollution);
                return await _context.SaveChangesAsync() > 0;
            }
            return false;
        }

        public async Task<bool> UpdateAsync(Pollution pollution)
        {
            if (pollution != null)
            {
                _context.Pollutions.Update(pollution);
                return await _context.SaveChangesAsync() > 0;
            }
            return false;
        }

        public async Task<Pollution> GetByIdAsync(long id)
        {
            return await _context.Pollutions.FindAsync(id);
        }
    }
}