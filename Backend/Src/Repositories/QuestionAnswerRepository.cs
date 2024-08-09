using DevSpace.Models;
using DevSpace.Repositories.Interfaces;

namespace DevSpace.Repositories;

public class QuestionAnswerRepository(DevSpaceContext db) : IQuestionAnswerRepository
{
	public void PostAnswer(QuestionAnswer questionAnswer)
	{
		db.QuestionAnswers.Add(questionAnswer);
	}

	public Task<int> SaveAsync()
	{
		return db.SaveChangesAsync();
	}
}
