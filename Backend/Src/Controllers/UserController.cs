using DevSpace.Repositories.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.AspNetCore.OData.Results;
using Microsoft.AspNetCore.OData.Routing.Controllers;

namespace DevSpace.Controllers;

[Authorize]
[Route("odata")]
public class UserController(IUserRepository userRepository) : ODataController
{
	[HttpGet("Users")]
	[EnableQuery]
	public IActionResult Get()
	{
		var users = userRepository.GetAllUsers();
		return Ok(users);
	}

	[HttpGet("Users({key})")]
	[EnableQuery]
	public IActionResult GetUser(int key)
	{
		var user = userRepository.GetQueryableUserById(key);

		return user.Any() ? Ok(SingleResult.Create(user)) : NotFound();
	}

	[HttpDelete("Users({key})")]
	public async Task<IActionResult> DeleteOneUser(int key)
	{
		if (!ModelState.IsValid)
		{
			return BadRequest(ModelState);
		}

		var dbUser = await userRepository.GetUserById(key);

		if (dbUser == null)
		{
			return NotFound();
		}

		userRepository.Delete(dbUser);
		await userRepository.SaveAsync();
		return NoContent();
	}
}
