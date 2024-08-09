using DevSpace.Dtos;
using DevSpace.Models;
using DevSpace.Repositories.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DevSpace.Controllers;

[Authorize]
[Route("[controller]")]
public class UserFollowController(IUserFollowRepository userFollowRepository) : ControllerBase
{
	[HttpPost("follow-user")]
	public async Task<IActionResult> FollowUser([FromBody] SenderAndRecipientIdsDto senderAndRecipientIdsDto)
	{
		try
		{
			if (!ModelState.IsValid)
			{
				return BadRequest(ModelState);
			}

			var userFollow = new UserFollow
			{
				SenderId = senderAndRecipientIdsDto.SenderId,
				RecipientId = senderAndRecipientIdsDto.RecipientId
			};

			userFollowRepository.FollowUser(userFollow);
			await userFollowRepository.SaveAsync();
			return Ok(new { successMessage = "User is successfully followed!" });
		}
		catch (Exception ex)
		{
			return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
		}
	}

	[HttpPost("unfollow-user")]
	public async Task<IActionResult> UnfollowUser([FromBody] SenderAndRecipientIdsDto senderAndRecipientIdsDto)
	{
		try
		{
			if (!ModelState.IsValid)
			{
				return BadRequest(ModelState);
			}

			var dbUserFollow = await userFollowRepository.GetUserFollowBySenderAndRecipientIds(
				senderAndRecipientIdsDto
			);
			UserFollow userFollow = userFollowRepository.GetUserFollowById(dbUserFollow.Id);

			userFollowRepository.UnfollowUser(userFollow);
			await userFollowRepository.SaveAsync();
			return Ok(new { successMessage = "User is successfully unfollowed!" });
		}
		catch (Exception ex)
		{
			return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
		}
	}
}
