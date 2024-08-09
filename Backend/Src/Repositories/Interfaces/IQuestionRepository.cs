using DevSpace.Models;
using Microsoft.AspNetCore.OData.Deltas;
using Microsoft.EntityFrameworkCore;

namespace DevSpace.Repositories.Interfaces;

public interface IQuestionRepository
{
	DbSet<Question> GetAllQuestions();

	Task<Question> GetQuestionById(int id);

	IQueryable<Question> GetQueryableQuestionById(int id);

	void Create(Question question);

	void Patch(Question dbQuestion, Delta<Question> patchedQuestion);

	void Delete(Question question);

	Task<int> SaveAsync();
}
