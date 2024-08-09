namespace DevSpace.Models;

public partial class UserFollow
{
	public int Id { get; set; }

	public int SenderId { get; set; }

	public int RecipientId { get; set; }

	public DateTime? CreatedAt { get; set; }

	public DateTime? UpdatedAt { get; set; }

	public virtual User Recipient { get; set; } = null!;

	public virtual User Sender { get; set; } = null!;
}
