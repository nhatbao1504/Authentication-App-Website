using System.ComponentModel.DataAnnotations;

namespace API.Dtos
{
    public class RegisterDto
    {
        [Required]
        [EmailAddress]
        public string Email {get; set;} = string.Empty;

        public string FullName {get; set;} = string.Empty;

        public string PassWord {get; set;} = string.Empty;
        public List<String>? Roles {get; set;}
    }
}