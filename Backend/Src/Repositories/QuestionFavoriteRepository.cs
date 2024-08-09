using DevSpace.Models;
using DevSpace.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace DevSpace.Repositories;

public class QuestionFavoriteRepository(DevSpaceContext db) : IQuestionFavoriteRepository
{
	public async Task<QuestionFavorite> GetQuestionFavoriteByKeyAndUserId(int key, int userId)
	{
		var questionFavorite = await db.QuestionFavorites.FirstOrDefaultAsync(q =>
			q.QuestionId == key && q.UserId == userId
		);

		return questionFavorite!;
	}

	public void AddQuestionToFavorites(QuestionFavorite questionFavorite)
	{
		db.QuestionFavorites.Add(questionFavorite);
	}

	public void DeleteQuestionFromFavorites(QuestionFavorite questionFavorite)
	{
		db.QuestionFavorites.Remove(questionFavorite);
	}

	public Task<int> SaveAsync()
	{
		return db.SaveChangesAsync();
	}
}
