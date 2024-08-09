using DevSpace.Models;
using DevSpace.Repositories.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Routing.Controllers;

namespace DevSpace.Controllers;

[Authorize]
[Route("odata")]
public class QuestionAnswerController(
	IQuestionRepository questionRepository,
	IQuestionAnswerRepository questionAnswerRepository
) : ODataController
{
	[HttpPost("Questions({key})/QuestionAnswers")]
	public async Task<IActionResult> PostAnswer(int key, [FromBody] QuestionAnswer questionAnswer)
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

		questionAnswer.Question = dbQuestion;

		questionAnswerRepository.PostAnswer(questionAnswer);
		await questionAnswerRepository.SaveAsync();
		return Ok(questionAnswer);
	}
}
