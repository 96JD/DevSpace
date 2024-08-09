namespace DevSpace.Models;

public partial class QuestionLike
{
	public int Id { get; set; }

	public int UserId { get; set; }

	public int QuestionId { get; set; }

	public DateTime? CreatedAt { get; set; }

	public virtual Question? Question { get; set; } = null!;

	public virtual User? User { get; set; } = null!;
}
