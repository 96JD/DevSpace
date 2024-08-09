using DevSpace.Dtos;
using DevSpace.Models;
using Microsoft.EntityFrameworkCore;

namespace DevSpace.Repositories.Interfaces;

public interface IUserRepository
{
	DbSet<User> GetAllUsers();

	Task<User> GetUserById(int id);

	IQueryable<User> GetQueryableUserById(int id);

	Task<UserDto> GetUserByEmail(string email);

	Task<UserDto> GetUserByEmailAndPassword(EmailAndPasswordDto emailAndPasswordDto);

	void Create(User user);

	void Delete(User user);

	void ChangePassword(User user);

	Task<int> SaveAsync();
}
