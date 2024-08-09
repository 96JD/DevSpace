using DevSpace.Models;
using DevSpace.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace DevSpace.Repositories;

public class QuestionLikeRepository(DevSpaceContext db) : IQuestionLikeRepository
{
	public async Task<QuestionLike> GetQuestionLikeByKeyAndUserId(int key, int userId)
	{
		var questionLike = await db.QuestionLikes.FirstOrDefaultAsync(q => q.QuestionId == key && q.UserId == userId);

		return questionLike!;
	}

	public void LikeQuestion(QuestionLike questionLike)
	{
		db.QuestionLikes.Add(questionLike);
	}

	public void UnlikeQuestion(QuestionLike questionLike)
	{
		db.QuestionLikes.Remove(questionLike);
	}

	public Task<int> SaveAsync()
	{
		return db.SaveChangesAsync();
	}
}
