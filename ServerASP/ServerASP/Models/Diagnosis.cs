using System.ComponentModel.DataAnnotations;

namespace ServerASP.Models
{
    public class Diagnosis
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

    }
}
