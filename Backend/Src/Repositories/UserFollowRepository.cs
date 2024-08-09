using DevSpace.Dtos;
using DevSpace.Models;
using DevSpace.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace DevSpace.Repositories;

public class UserFollowRepository(DevSpaceContext db) : IUserFollowRepository
{
	public UserFollow GetUserFollowById(int id)
	{
		return db.UserFollows.Find(id)!;
	}

	public Task<UserDto> GetUserFollowBySenderAndRecipientIds(SenderAndRecipientIdsDto senderAndRecipientIdsDto)
	{
		return db
			.UserFollows.Where(user =>
				user.SenderId == senderAndRecipientIdsDto.SenderId
				&& user.RecipientId == senderAndRecipientIdsDto.RecipientId
			)
			.Select(user => new UserDto { Id = user.Id, })
			.FirstOrDefaultAsync()!;
	}

	public void FollowUser(UserFollow userFollow)
	{
		db.UserFollows.Add(userFollow);
	}

	public void UnfollowUser(UserFollow userFollow)
	{
		db.UserFollows.Remove(userFollow);
	}

	public Task<int> SaveAsync()
	{
		return db.SaveChangesAsync();
	}
}
