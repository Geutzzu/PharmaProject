using System.ComponentModel.DataAnnotations;

namespace ServerASP.Models
{
    public class User
    {
        /// TO BE MODIFIED COMPLETELY
        [Key]
        public int Id { get; set; }

        [Required]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }

        [Required]
        public string Role { get; set; }
    }
}
