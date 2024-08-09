using System.Globalization;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using DevSpace.Dtos;
using DevSpace.Helpers;
using DevSpace.Models;
using DevSpace.Repositories.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using _96JD.PasswordUtils;

namespace DevSpace.Controllers;

[ApiController]
[Route("[controller]")]
public class AuthController(IConfiguration config, IUserRepository userRepository) : ControllerBase
{
	[HttpPost("register")]
	public async Task<IActionResult> Register(IFormCollection formData)
	{
		var profilePicture = formData.Files[0];
		var email = formData["Email"];
		var salary = ulong.Parse(formData["Salary"]!);
		var isTermsAndPrivacyAccepted = ulong.Parse(formData["IsTermsAndPrivacyAccepted"]!);

		var user = new User
		{
			ProfilePicture = ImageHandler.UploadImage($"{email}/", profilePicture),
			CoverPhoto = "/assets/default_cover_photo.png"
		};

		var cs = new CaseSensitivity();

		user.FirstName = cs.FirstWordFirstLetterUpperCase(formData["FirstName"]!);
		user.LastName = cs.FirstWordFirstLetterUpperCase(formData["LastName"]!);
		user.JobTitle = cs.FirstWordFirstLetterUpperCase(formData["JobTitle"]!);
		user.Phone = formData["Phone"]!;
		user.Email = email!;
		user.City = cs.FirstWordFirstLetterUpperCase(formData["City"]!);
		user.Salary = salary;
		user.Birthday = DateOnly.Parse(formData["Birthday"]!, CultureInfo.InvariantCulture);
		user.About = cs.FirstWordFirstLetterUpperCase(formData["About"]!);

		user.Password = PasswordUtils.Encrypt(formData["Password"]!);

		user.IsTermsAndPrivacyAccepted = isTermsAndPrivacyAccepted;

		userRepository.Create(user);
		await userRepository.SaveAsync();
		return Ok(new { successMessage = "New User is added!" });
	}

	[HttpPost("login")]
	public async Task<IActionResult> Login(EmailAndPasswordDto emailAndPasswordDto)
	{
		var dbUser = await userRepository.GetUserByEmailAndPassword(emailAndPasswordDto);

		if (dbUser != null)
		{
			var claims = new[]
			{
				new Claim(JwtRegisteredClaimNames.Sub, config["Jwt:Subject"]!),
				new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
				new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()),
			};

			var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["Jwt:Key"]!));
			var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
			var token = new JwtSecurityToken(
				config["Jwt:Issuer"],
				config["Jwt:Audience"],
				claims,
				expires: DateTime.UtcNow.AddYears(1),
				signingCredentials: signIn
			);
			return Ok(new { LoggedInUser = dbUser, JwtToken = new JwtSecurityTokenHandler().WriteToken(token) });
		}
		else
		{
			return BadRequest("Invalid credentials!");
		}
	}

	[Authorize]
	[HttpGet("logout")]
	public IActionResult Logout()
	{
		return Ok();
	}

	[HttpPost("forgot-your-password")]
	public async Task<IActionResult> ForgotYourPassword(EmailDto emailDto)
	{
		var dbUser = await userRepository.GetUserByEmail(emailDto.Email!);

		if (dbUser != null)
		{
			return Ok();
		}
		return BadRequest("No user found with the provided email!");
	}

	[HttpPost("change-your-password")]
	public async Task<IActionResult> ChangeYourPassword(EmailAndPasswordDto emailAndPasswordDto)
	{
		var dbUser = await userRepository.GetUserByEmail(emailAndPasswordDto.Email!);

		if (dbUser != null)
		{
			User user = await userRepository.GetUserById(dbUser.Id);

			user.Password = PasswordUtils.Encrypt(emailAndPasswordDto.Password!);

			userRepository.ChangePassword(user);
			await userRepository.SaveAsync();

			return Ok();
		}
		return BadRequest("Changing Password Failed!");
	}
}
