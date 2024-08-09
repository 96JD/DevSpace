using DevSpace.Constants;

namespace DevSpace.Helpers;

public static class AppSettingsConfigurator
{
	public static IConfiguration GetAppSettingsJson()
	{
		string environment = string.IsNullOrEmpty(Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT"))
			? SharedConstants.Production
			: SharedConstants.Development;
		return new ConfigurationBuilder()
			.SetBasePath(Directory.GetCurrentDirectory())
			.AddJsonFile($"appsettings.{environment}.json", optional: true)
			.Build();
	}

	public static bool IsDevelopmentEnvironment()
	{
		string environment = string.IsNullOrEmpty(Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT"))
			? SharedConstants.Production
			: SharedConstants.Development;
		return string.Equals(environment, SharedConstants.Development);
	}
}
