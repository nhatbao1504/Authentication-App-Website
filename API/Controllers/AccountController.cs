using System.IdentityModel.Tokens.Jwt;
using System.Text;
using API.Dtos;
using API.Models;
using Microsoft.AspNetCore.Authorization.Infrastructure;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    //api/account
    public class AccountController:ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IConfiguration _configuration;

        public AccountController(UserManager<AppUser> userManager, RoleManager<IdentityRole> roleManager, IConfiguration configuration)
        {
            _userManager = userManager;
            _roleManager =  roleManager;
            _configuration = configuration;
        }

        [HttpPost("register")]
        //api/account/register

        public async Task<ActionResult<string>> Register(RegisterDto registerDto)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = new AppUser{
                Email = registerDto.Email,
                FullName = registerDto.FullName,
                UserName = registerDto.Email
            };

            var result = await _userManager.CreateAsync(user, registerDto.PassWord);

            if(!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }

            if(registerDto.Roles is null) {
                await _userManager.AddToRoleAsync(user,"User");
            } else {
                foreach(var role in  registerDto.Roles)
                {
                    await _userManager.AddToRoleAsync(user, role);
                }
            }

            return Ok(new AuthResponseDto{
                IsSuccess = true,
                Message = "Account Created Successfully!"
            });
        }

        [HttpPost("login")]
        //api/account/login

        public async Task<ActionResult<AuthResponseDto>> Login(LoggingBuilderExtensions loginDto)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = await _userManager.FindByEmailAsync(loginDto.Email);
            
            if(user is null)
            {
                return Unauthorized(new AuthResponseDto{
                    IsSuccess = false,
                    Message = "User not found!"
                });
            }

            var result = await _userManager.CheckPasswordAsync(loginDto.PassWord);

            if(!result)
            {
                return Unauthorized(new AuthResponseDto{
                    IsSuccess = false,
                    Message = "Invalid Password!"
                });
            }
        }
        private string GenerateToken(AppUser user){
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_configuration.GetSection("JWTSetting").GetSection("securityKey").Value!);
        }
    }
}