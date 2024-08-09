using DevSpace.Models;

namespace DevSpace.Repositories.Interfaces;

public interface IQuestionFavoriteRepository
{
	Task<QuestionFavorite> GetQuestionFavoriteByKeyAndUserId(int key, int userId);

	void AddQuestionToFavorites(QuestionFavorite questionFavorite);

	void DeleteQuestionFromFavorites(QuestionFavorite questionFavorite);

	Task<int> SaveAsync();
}
