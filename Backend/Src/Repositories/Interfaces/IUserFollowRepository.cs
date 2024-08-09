using DevSpace.Dtos;
using DevSpace.Models;

namespace DevSpace.Repositories.Interfaces;

public interface IUserFollowRepository
{
	UserFollow GetUserFollowById(int id);

	Task<UserDto> GetUserFollowBySenderAndRecipientIds(SenderAndRecipientIdsDto senderAndRecipientIdsDto);

	void FollowUser(UserFollow userFollow);

	void UnfollowUser(UserFollow userFollow);

	Task<int> SaveAsync();
}
