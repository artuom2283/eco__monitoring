using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using server.Entities;

namespace server.Data
{
    public class DatabaseContext : DbContext
    {
        public DatabaseContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Pollution> Pollutions { get; set; }
        public DbSet<IndustrialFacility> Facilities { get; set; }
        public DbSet<Report> Reports { get; set; }
        public DbSet<Risk> Risks { get; set; }
        public DbSet<Damage> Damages { get; set; }
    }
}