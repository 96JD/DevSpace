namespace DevSpace.Models;

public partial class Question
{
	public int Id { get; set; }

	public string Title { get; set; } = null!;

	public string Description { get; set; } = null!;

	public DateTime? CreatedAt { get; set; }

	public DateTime? UpdatedAt { get; set; }

	public int UserId { get; set; }

	public virtual ICollection<QuestionAnswer> QuestionAnswers { get; } = [];

	public virtual ICollection<QuestionFavorite> QuestionFavorites { get; } = [];

	public virtual ICollection<QuestionLike> QuestionLikes { get; } = [];

	public virtual User? User { get; set; } = null!;
}
