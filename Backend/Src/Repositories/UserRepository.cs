using DevSpace.Dtos;
using DevSpace.Models;
using DevSpace.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using _96JD.PasswordUtils;

namespace DevSpace.Repositories;

public class UserRepository(DevSpaceContext db) : IUserRepository
{
	public DbSet<User> GetAllUsers()
	{
		return db.Users;
	}

	public async Task<User> GetUserById(int id)
	{
		var user = await db.Users.FindAsync(id)!;

		return user!;
	}

	public IQueryable<User> GetQueryableUserById(int id)
	{
		var user = db.Users.Where(u => u.Id == id)!;

		return user;
	}

	public Task<UserDto> GetUserByEmail(string email)
	{
		return db
			.Users.Where(user => user.Email == email)
			.Select(user => new UserDto { Id = user.Id, })
			.FirstOrDefaultAsync()!;
	}

	public Task<UserDto> GetUserByEmailAndPassword(EmailAndPasswordDto emailAndPasswordDto)
	{
		return db
			.Users.Where(user =>
				user.Email == emailAndPasswordDto.Email
				&& user.Password == PasswordUtils.Encrypt(emailAndPasswordDto.Password!)
			)
			.Select(user => new UserDto
			{
				Id = user.Id,
				ProfilePicture = user.ProfilePicture,
				CoverPhoto = user.CoverPhoto,
				FirstName = user.FirstName,
				LastName = user.LastName,
				JobTitle = user.JobTitle,
				Phone = user.Phone,
				Email = user.Email,
				City = user.City,
				Salary = user.Salary,
				Birthday = user.Birthday,
				About = user.About,
			})
			.FirstOrDefaultAsync()!;
	}

	public void Create(User user)
	{
		db.Users.Add(user);
	}

	public void Delete(User user)
	{
		db.Users.Remove(user);
	}

	public void ChangePassword(User user)
	{
		db.Entry(user).State = EntityState.Modified;
	}

	public Task<int> SaveAsync()
	{
		return db.SaveChangesAsync();
	}
}
