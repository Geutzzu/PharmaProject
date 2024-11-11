using System.ComponentModel.DataAnnotations;

namespace ServerASP.Models
{
	public class Pharmacy
	{

		[Key]
		public int Id { get; set; }

		[Required]
		[StringLength(50)]
		public string Name { get; set; }

		[Required]
		[StringLength(50)]
		public string Address { get; set; }

		[Required]
		[StringLength(15)]
		public string PhoneNumber { get; set; }

		[Required]
		[StringLength(50)]
		public string Email { get; set; }

	}
}
