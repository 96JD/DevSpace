namespace DevSpace.Models;

public partial class User
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

    public string Password { get; set; } = null!;

    public ulong IsTermsAndPrivacyAccepted { get; set; }

    public DateTime? CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }

    public virtual ICollection<QuestionAnswer> QuestionAnswers { get; } = [];

    public virtual ICollection<QuestionFavorite> QuestionFavorites { get; } = [];

    public virtual ICollection<QuestionLike> QuestionLikes { get; } = [];

    public virtual ICollection<Question> Questions { get; } = [];

    public virtual ICollection<UserFollow> UserFollowRecipients { get; } = [];

    public virtual ICollection<UserFollow> UserFollowSenders { get; } = [];
}