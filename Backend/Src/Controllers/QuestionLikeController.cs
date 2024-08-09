using DevSpace.Models;
using DevSpace.Repositories.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Routing.Controllers;

namespace DevSpace.Controllers;

[Authorize]
[Route("odata")]
public class QuestionLikeController(
	IQuestionRepository questionRepository,
	IQuestionLikeRepository questionLikeRepository
) : ODataController
{
	[HttpPost("Questions({key})/QuestionLikes")]
	public async Task<IActionResult> LikeQuestion(int key, [FromBody] QuestionLike questionLike)
	{
		if (!ModelState.IsValid)
		{
			return BadRequest(ModelState);
		}

		var dbQuestion = await questionRepository.GetQuestionById(key);

		if (dbQuestion == null)
		{
			return NotFound();
		}

		questionLike.Question = dbQuestion;

		questionLikeRepository.LikeQuestion(questionLike);
		await questionLikeRepository.SaveAsync();
		return Ok(questionLike);
	}

	[HttpDelete("Questions({key})/QuestionLikes({userId})")]
	public async Task<IActionResult> UnlikeQuestion(int key, int userId)
	{
		if (!ModelState.IsValid)
		{
			return BadRequest(ModelState);
		}

		var dbQuestion = await questionRepository.GetQuestionById(key);

		if (dbQuestion == null)
		{
			return NotFound();
		}

		var dbQuestionLike = await questionLikeRepository.GetQuestionLikeByKeyAndUserId(key, userId);

		if (dbQuestionLike == null)
		{
			return NotFound();
		}

		questionLikeRepository.UnlikeQuestion(dbQuestionLike);
		await questionLikeRepository.SaveAsync();
		return NoContent();
	}
}
