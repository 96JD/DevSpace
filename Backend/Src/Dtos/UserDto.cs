namespace DevSpace.Dtos;

public class UserDto
{
	public int Id { get; set; }

	public string ProfilePicture { get; set; } = null!;

	public string? CoverPhoto { get; set; }

	public string FirstName { get; set; } = null!;

	public string LastName { get; set; } = null!;

	public string JobTitle { get; set; } = null!;

	public string Phone { get; set; } = null!;

	public string Email { get; set; } = null!;

	public string City { get; set; } = null!;

	public float? Salary { get; set; }

	public DateOnly Birthday { get; set; }

	public string About { get; set; } = null!;
}

public class EmailDto
{
	public string? Email { set; get; }
}

public class EmailAndPasswordDto
{
	public string? Email { set; get; }
	public string? Password { set; get; }
}

public class SenderAndRecipientIdsDto
{
	public int SenderId { get; set; }
	public int RecipientId { get; set; }
}
