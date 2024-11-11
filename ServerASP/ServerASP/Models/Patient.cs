using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ServerASP.Models
{
	public class Patient
	{

		[Key]
		public int Id { get; set; }

		[Required]
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
		[StringLength(50)]
		public string Address { get; set; }

		[Required]
		public DateOnly BirthDate { get; set; }

		[Required]
		[StringLength(50)]
		public string Gender { get; set; }

		[Required]
		public int DoctorId { get; set; }

		public virtual Doctor Doctor { get; set; }
	}
}
