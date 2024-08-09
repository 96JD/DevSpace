using DevSpace.Models;
using Microsoft.OData.Edm;
using Microsoft.OData.ModelBuilder;

namespace DevSpace.Helpers;

public class EntityDataModel
{
	public IEdmModel GetEntityDataModel()
	{
		var modelBuilder = new ODataConventionModelBuilder
		{
			Namespace = "DevSpace",
			ContainerName = "DevSpaceContainer"
		};

		modelBuilder.EntitySet<User>("Users");
		modelBuilder.EntitySet<Question>("Questions");

		return modelBuilder.GetEdmModel();
	}
}
