namespace API.Dtos
{
    public class UserDetailDto
    {
        public string? Id { get; set; }
        public string? FullName { get; set; }
        public string? Email { get; set; }
        public string[]? Roles { get; set; }
        public string? PhoneNumber { get; set; }
        public bool TwoFactorEnable { get; set; }
        public bool PhoneNumberConfirm { get; set; }
        public int AccessFailCount { get; set; }
    }
}