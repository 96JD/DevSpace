using DevSpace.Models;

namespace DevSpace.Repositories.Interfaces;

public interface IQuestionLikeRepository
{
	Task<QuestionLike> GetQuestionLikeByKeyAndUserId(int key, int userId);

	void LikeQuestion(QuestionLike questionLike);

	void UnlikeQuestion(QuestionLike questionLike);

	Task<int> SaveAsync();
}
