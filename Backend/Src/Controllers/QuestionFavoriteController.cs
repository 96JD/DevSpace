using DevSpace.Models;
using DevSpace.Repositories.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Routing.Controllers;

namespace DevSpace.Controllers;

[Authorize]
[Route("odata")]
public class QuestionFavoriteController(
	IQuestionRepository questionRepository,
	IQuestionFavoriteRepository questionFavoriteRepository
) : ODataController
{
	[HttpPost("Questions({key})/QuestionFavorites")]
	public async Task<IActionResult> AddQuestionToFavorites(int key, [FromBody] QuestionFavorite questionFavorite)
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

		questionFavorite.Question = dbQuestion;

		questionFavoriteRepository.AddQuestionToFavorites(questionFavorite);
		await questionFavoriteRepository.SaveAsync();
		return Ok(questionFavorite);
	}

	[HttpDelete("Questions({key})/QuestionFavorites({userId})")]
	public async Task<IActionResult> DeleteQuestionFromFavorites(int key, int userId)
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

		var dbQuestionFavorite = await questionFavoriteRepository.GetQuestionFavoriteByKeyAndUserId(key, userId);

		if (dbQuestionFavorite == null)
		{
			return NotFound();
		}

		questionFavoriteRepository.DeleteQuestionFromFavorites(dbQuestionFavorite);
		await questionFavoriteRepository.SaveAsync();
		return NoContent();
	}
}
