using Microsoft.EntityFrameworkCore;

namespace DevSpace.Models;

public partial class DevSpaceContext : DbContext
{
	public DevSpaceContext() { }

	public DevSpaceContext(DbContextOptions<DevSpaceContext> options)
		: base(options) { }

	public virtual DbSet<Question> Questions { get; set; }

	public virtual DbSet<QuestionAnswer> QuestionAnswers { get; set; }

	public virtual DbSet<QuestionFavorite> QuestionFavorites { get; set; }

	public virtual DbSet<QuestionLike> QuestionLikes { get; set; }

	public virtual DbSet<User> Users { get; set; }

	public virtual DbSet<UserFollow> UserFollows { get; set; }

	protected override void OnModelCreating(ModelBuilder modelBuilder)
	{
		modelBuilder.UseCollation("utf8mb4_0900_ai_ci").HasCharSet("utf8mb4");

		modelBuilder.Entity<Question>(entity =>
		{
			entity.HasKey(e => e.Id).HasName("PRIMARY");

			entity.ToTable("questions");

			entity.HasIndex(e => e.UserId, "user_id");

			entity.Property(e => e.Id).HasColumnName("id");
			entity
				.Property(e => e.CreatedAt)
				.HasDefaultValueSql("CURRENT_TIMESTAMP")
				.HasColumnType("datetime")
				.HasColumnName("created_at");
			entity.Property(e => e.Description).HasColumnType("text").HasColumnName("description");
			entity.Property(e => e.Title).HasMaxLength(255).HasColumnName("title");
			entity.Property(e => e.UpdatedAt).HasColumnType("datetime").HasColumnName("updated_at");
			entity.Property(e => e.UserId).HasColumnName("user_id");

			entity
				.HasOne(d => d.User)
				.WithMany(p => p.Questions)
				.HasForeignKey(d => d.UserId)
				.HasConstraintName("questions_ibfk_1");
		});

		modelBuilder.Entity<QuestionAnswer>(entity =>
		{
			entity.HasKey(e => e.Id).HasName("PRIMARY");

			entity.ToTable("question_answers");

			entity.HasIndex(e => e.QuestionId, "question_id");

			entity.HasIndex(e => e.UserId, "user_id");

			entity.Property(e => e.Id).HasColumnName("id");
			entity.Property(e => e.Answer).HasColumnType("text").HasColumnName("answer");
			entity
				.Property(e => e.CreatedAt)
				.HasDefaultValueSql("CURRENT_TIMESTAMP")
				.HasColumnType("datetime")
				.HasColumnName("created_at");
			entity.Property(e => e.QuestionId).HasColumnName("question_id");
			entity.Property(e => e.UpdatedAt).HasColumnType("datetime").HasColumnName("updated_at");
			entity.Property(e => e.UserId).HasColumnName("user_id");

			entity
				.HasOne(d => d.Question)
				.WithMany(p => p.QuestionAnswers)
				.HasForeignKey(d => d.QuestionId)
				.HasConstraintName("question_answers_ibfk_2");

			entity
				.HasOne(d => d.User)
				.WithMany(p => p.QuestionAnswers)
				.HasForeignKey(d => d.UserId)
				.HasConstraintName("question_answers_ibfk_1");
		});

		modelBuilder.Entity<QuestionFavorite>(entity =>
		{
			entity.HasKey(e => e.Id).HasName("PRIMARY");

			entity.ToTable("question_favorites");

			entity.HasIndex(e => e.QuestionId, "question_id");

			entity.HasIndex(e => e.UserId, "user_id");

			entity.Property(e => e.Id).HasColumnName("id");
			entity
				.Property(e => e.CreatedAt)
				.HasDefaultValueSql("CURRENT_TIMESTAMP")
				.HasColumnType("datetime")
				.HasColumnName("created_at");
			entity.Property(e => e.QuestionId).HasColumnName("question_id");
			entity.Property(e => e.UserId).HasColumnName("user_id");

			entity
				.HasOne(d => d.Question)
				.WithMany(p => p.QuestionFavorites)
				.HasForeignKey(d => d.QuestionId)
				.HasConstraintName("question_favorites_ibfk_2");

			entity
				.HasOne(d => d.User)
				.WithMany(p => p.QuestionFavorites)
				.HasForeignKey(d => d.UserId)
				.HasConstraintName("question_favorites_ibfk_1");
		});

		modelBuilder.Entity<QuestionLike>(entity =>
		{
			entity.HasKey(e => e.Id).HasName("PRIMARY");

			entity.ToTable("question_likes");

			entity.HasIndex(e => e.QuestionId, "question_id");

			entity.HasIndex(e => e.UserId, "user_id");

			entity.Property(e => e.Id).HasColumnName("id");
			entity
				.Property(e => e.CreatedAt)
				.HasDefaultValueSql("CURRENT_TIMESTAMP")
				.HasColumnType("datetime")
				.HasColumnName("created_at");
			entity.Property(e => e.QuestionId).HasColumnName("question_id");
			entity.Property(e => e.UserId).HasColumnName("user_id");

			entity
				.HasOne(d => d.Question)
				.WithMany(p => p.QuestionLikes)
				.HasForeignKey(d => d.QuestionId)
				.HasConstraintName("question_likes_ibfk_2");

			entity
				.HasOne(d => d.User)
				.WithMany(p => p.QuestionLikes)
				.HasForeignKey(d => d.UserId)
				.HasConstraintName("question_likes_ibfk_1");
		});

		modelBuilder.Entity<User>(entity =>
		{
			entity.HasKey(e => e.Id).HasName("PRIMARY");

			entity.ToTable("users");

			entity.Property(e => e.Id).HasColumnName("id");
			entity.Property(e => e.About).HasColumnType("text").HasColumnName("about");
			entity.Property(e => e.Birthday).HasColumnName("birthday");
			entity.Property(e => e.City).HasMaxLength(255).HasColumnName("city");
			entity.Property(e => e.CoverPhoto).HasMaxLength(255).HasColumnName("cover_photo");
			entity
				.Property(e => e.CreatedAt)
				.HasDefaultValueSql("CURRENT_TIMESTAMP")
				.HasColumnType("datetime")
				.HasColumnName("created_at");
			entity.Property(e => e.Email).HasMaxLength(255).HasColumnName("email");
			entity.Property(e => e.FirstName).HasMaxLength(255).HasColumnName("first_name");
			entity
				.Property(e => e.IsTermsAndPrivacyAccepted)
				.HasColumnType("bit(1)")
				.HasColumnName("is_terms_and_privacy_accepted");
			entity.Property(e => e.JobTitle).HasMaxLength(255).HasColumnName("job_title");
			entity.Property(e => e.LastName).HasMaxLength(255).HasColumnName("last_name");
			entity.Property(e => e.Password).HasMaxLength(255).HasColumnName("password");
			entity.Property(e => e.Phone).HasMaxLength(255).HasColumnName("phone");
			entity.Property(e => e.ProfilePicture).HasMaxLength(255).HasColumnName("profile_picture");
			entity.Property(e => e.Salary).HasColumnName("salary");
			entity.Property(e => e.UpdatedAt).HasColumnType("datetime").HasColumnName("updated_at");
		});

		modelBuilder.Entity<UserFollow>(entity =>
		{
			entity.HasKey(e => e.Id).HasName("PRIMARY");

			entity.ToTable("user_follows");

			entity.HasIndex(e => e.RecipientId, "recipient_id");

			entity.HasIndex(e => e.SenderId, "sender_id");

			entity.Property(e => e.Id).HasColumnName("id");
			entity
				.Property(e => e.CreatedAt)
				.HasDefaultValueSql("CURRENT_TIMESTAMP")
				.HasColumnType("datetime")
				.HasColumnName("created_at");
			entity.Property(e => e.RecipientId).HasColumnName("recipient_id");
			entity.Property(e => e.SenderId).HasColumnName("sender_id");
			entity.Property(e => e.UpdatedAt).HasColumnType("datetime").HasColumnName("updated_at");

			entity
				.HasOne(d => d.Recipient)
				.WithMany(p => p.UserFollowRecipients)
				.HasForeignKey(d => d.RecipientId)
				.HasConstraintName("user_follows_ibfk_2");

			entity
				.HasOne(d => d.Sender)
				.WithMany(p => p.UserFollowSenders)
				.HasForeignKey(d => d.SenderId)
				.HasConstraintName("user_follows_ibfk_1");
		});
	}
}
