using DevSpace.Models;
using DevSpace.Repositories.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Deltas;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.AspNetCore.OData.Results;
using Microsoft.AspNetCore.OData.Routing.Controllers;

namespace DevSpace.Controllers;

[Authorize]
[Route("odata")]
public class QuestionController(IQuestionRepository questionRepository) : ODataController
{
	[HttpGet("Questions")]
	[EnableQuery]
	public IActionResult Get()
	{
		var questions = questionRepository.GetAllQuestions();
		return Ok(questions);
	}

	[HttpGet("Questions({key})")]
	[EnableQuery]
	public IActionResult GetQuestion(int key)
	{
		var question = questionRepository.GetQueryableQuestionById(key);
		return question.Any() ? Ok(SingleResult.Create(question)) : NotFound();
	}

	[HttpPost("Questions")]
	public async Task<IActionResult> CreateUserFollowSenderForUser([FromBody] Question question)
	{
		if (!ModelState.IsValid)
		{
			return BadRequest(ModelState);
		}

		questionRepository.Create(question);
		await questionRepository.SaveAsync();
		return Ok(question);
	}

	[HttpPatch("Questions({key})")]
	public async Task<IActionResult> PartiallyUpdateQuestion(int key, [FromBody] Delta<Question> patchedQuestion)
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

		questionRepository.Patch(dbQuestion, patchedQuestion);
		await questionRepository.SaveAsync();
		return NoContent();
	}

	[HttpDelete("Questions({key})")]
	public async Task<IActionResult> DeleteOneQuestion(int key)
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

		questionRepository.Delete(dbQuestion);
		await questionRepository.SaveAsync();
		return NoContent();
	}
}
