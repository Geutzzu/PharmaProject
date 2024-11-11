using System.ComponentModel.DataAnnotations;

namespace ServerASP.Models
{
	public class Doctor
	{

		[Key]
		[StringLength(13)]
		public string CNP { get; set; }

		[Required]
		[StringLength(50)]
		public string FirstName { get; set; }

		[Required]
		[StringLength(50)]
		public string LastName { get; set; }

		[Required]
		[StringLength(50)]
		public string Email { get; set; }

		[Required]
		[StringLength(15)]
		public string PhoneNumber { get; set; }

		[Required]
		[StringLength(10)]
		public string CodParafa { get; set; }

		public virtual ICollection<Patient> Patients { get; set; }
	}
}
