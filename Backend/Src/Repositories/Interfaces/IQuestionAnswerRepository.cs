using DevSpace.Models;

namespace DevSpace.Repositories.Interfaces;

public interface IQuestionAnswerRepository
{
	void PostAnswer(QuestionAnswer questionAnswer);

	Task<int> SaveAsync();
}
