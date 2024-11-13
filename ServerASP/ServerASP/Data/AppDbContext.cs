
using Microsoft.EntityFrameworkCore;
using ServerASP.Models;

namespace ServerASP.Data
{
	public class AppDbContext : DbContext
	{
		public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
		{

		}

		public DbSet<Medication> Medications { get; set; }
		public DbSet<Pharmacy> Pharmacies { get; set; }
		public DbSet<Prescription> Prescriptions { get; set; }
		public DbSet<User> Users { get; set; }
		public DbSet<Diagnosis> Diagnoses { get; set; }
		public DbSet<Patient> Patients { get; set; }
		public DbSet<Doctor> Doctors { get; set; }

	}
}
