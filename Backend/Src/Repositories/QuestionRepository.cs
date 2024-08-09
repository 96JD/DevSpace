using DevSpace.Models;
using DevSpace.Repositories.Interfaces;
using Microsoft.AspNetCore.OData.Deltas;
using Microsoft.EntityFrameworkCore;

namespace DevSpace.Repositories;

public class QuestionRepository(DevSpaceContext db) : IQuestionRepository
{
	public DbSet<Question> GetAllQuestions()
	{
		return db.Questions;
	}

	public async Task<Question> GetQuestionById(int id)
	{
		var question = await db.Questions.FindAsync(id)!;

		return question!;
	}

	public IQueryable<Question> GetQueryableQuestionById(int id)
	{
		var question = db.Questions.Where(q => q.Id == id)!;

		return question;
	}

	public void Create(Question question)
	{
		db.Questions.Add(question);
	}

	public void Patch(Question dbQuestion, Delta<Question> patchedQuestion)
	{
		patchedQuestion.Patch(dbQuestion);
	}

	public void Delete(Question question)
	{
		db.Questions.Remove(question);
	}

	public Task<int> SaveAsync()
	{
		return db.SaveChangesAsync();
	}
}
