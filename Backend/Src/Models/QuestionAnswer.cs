namespace DevSpace.Models;

public partial class QuestionAnswer
{
	public int Id { get; set; }

	public int UserId { get; set; }

	public int QuestionId { get; set; }

	public string Answer { get; set; } = null!;

	public DateTime? CreatedAt { get; set; }

	public DateTime? UpdatedAt { get; set; }

	public virtual Question? Question { get; set; } = null!;

	public virtual User? User { get; set; } = null!;
}
