using System.ComponentModel.DataAnnotations;

namespace ServerASP.Models
{
	public class Medication
	{

		[Key]
		public int Id { get; set; }

		/// TEMPORARY UNTIL WE LINK DATABASE OF medicamente
		[Required]
		[StringLength(50)]
		public string Name { get; set; }

		[Required]
		public bool IsClaimed { get; set; }

		[Required]
		public int PrescriptionId { get; set; }

		public virtual Prescription Prescription { get; set; }

		[Required]
		public int PharmacyId { get; set;}

		public virtual Pharmacy Pharmacy { get; set; }
	}
}
