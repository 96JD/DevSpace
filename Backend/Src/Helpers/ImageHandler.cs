using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using DevSpace.Constants;
using Newtonsoft.Json.Linq;

namespace DevSpace.Helpers;

public static class ImageHandler
{
	public static string UploadImage(string folderPath, IFormFile file)
	{
		if (AppSettingsConfigurator.IsDevelopmentEnvironment())
		{
			string imagesPath = $"images/{folderPath}";
			string uploadPath = Path.Combine(Directory.GetCurrentDirectory(), $"wwwroot/{imagesPath}");
			Directory.CreateDirectory(uploadPath);
			string timestamp = DateTime.Now.ToString($"{SharedConstants.DateFormat} {SharedConstants.TimeFormat}");
			string guid = Guid.NewGuid().ToString();
			string fileName = file.FileName;
			string fileNameWithoutExtension = Path.GetFileNameWithoutExtension(fileName);
			string fileExtension = Path.GetExtension(fileName);
			string uniqueFileName = $"{fileNameWithoutExtension} - {timestamp} - {guid}{fileExtension}";
			string filePath = Path.Combine(uploadPath, uniqueFileName);
			file.CopyToAsync(new FileStream(filePath, FileMode.Create));
			return imagesPath + uniqueFileName;
		}
		else
		{
			IConfiguration configuration = AppSettingsConfigurator.GetAppSettingsJson();
			string cloudinaryCloud = configuration.GetValue<string>("Cloudinary:Cloud")!;
			string cloudinaryApiKey = configuration.GetValue<string>("Cloudinary:ApiKey")!;
			string cloudinaryApiSecret = configuration.GetValue<string>("Cloudinary:ApiSecret")!;

			Account account = new(cloudinaryCloud, cloudinaryApiKey, cloudinaryApiSecret);
			Cloudinary cloudinary = new(account);
			cloudinary.Api.Secure = true;
			using Stream stream = file.OpenReadStream();
			string timestamp = DateTime.Now.ToString($"{SharedConstants.DateFormat} {SharedConstants.TimeFormat}");
			string fileName = file.FileName;
			ImageUploadParams uploadParams =
				new()
				{
					File = new FileDescription($"{timestamp} {fileName}", stream),
					UseFilename = true,
					UniqueFilename = false,
					Overwrite = true
				};
			ImageUploadResult uploadResult = cloudinary.Upload(uploadParams);
			JObject jObject = JObject.Parse(uploadResult.JsonObj.ToString());
			return (string)jObject["secure_url"]!;
		}
	}
}
