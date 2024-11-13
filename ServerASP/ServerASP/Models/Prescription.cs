using System.ComponentModel.DataAnnotations;

namespace ServerASP.Models
{
	public class Prescription
	{

		[Key]
		public int Id { get; set; }

		[Required]
		public int PatientId { get; set; }

		public virtual Patient Patient { get; set; }

		[Required]
		public int DoctorId { get; set; }

		public virtual Doctor Doctor { get; set; }

		public string Notes { get; set; }

		[Required]
		public int DiagnosisId { get; set; }

		public virtual Diagnosis Diagnosis { get; set; }

		public virtual ICollection<Medication> Medications { get; set; }

	}
}
