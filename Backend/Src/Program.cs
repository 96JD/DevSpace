using System.Text;
using DevSpace.Helpers;
using DevSpace.Models;
using DevSpace.Repositories;
using DevSpace.Repositories.Interfaces;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.OData;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;

WebApplicationBuilder builder = WebApplication.CreateBuilder(args);
ConfigurationManager configuration = builder.Configuration;
string connectionString = configuration.GetConnectionString("DefaultConnection")!;
string[] origins = configuration.GetSection("FrontEnd:Origins").Get<string[]>()!;

builder
	.Services.AddControllers()
	.AddJsonOptions(o =>
	{
		o.JsonSerializerOptions.PropertyNamingPolicy = null;
	})
	.AddOData(o => o.EnableQueryFeatures(100).AddRouteComponents("odata", new EntityDataModel().GetEntityDataModel()));

builder.Services.AddEndpointsApiExplorer();

builder.Services.AddCors(o =>
	o.AddDefaultPolicy(p => p.WithOrigins(origins).AllowAnyHeader().AllowAnyMethod().AllowCredentials())
);

builder
	.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
	.AddJwtBearer(o =>
	{
		o.RequireHttpsMetadata = false;
		o.SaveToken = true;
		o.TokenValidationParameters = new TokenValidationParameters()
		{
			ValidateIssuer = true,
			ValidateAudience = true,
			ValidAudience = builder.Configuration["Jwt:Audience"],
			ValidIssuer = builder.Configuration["Jwt:Issuer"],
			IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]!))
		};
	});

builder.Services.AddDbContext<DevSpaceContext>(o =>
	o.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString)).EnableDetailedErrors()
);

builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IUserFollowRepository, UserFollowRepository>();
builder.Services.AddScoped<IQuestionRepository, QuestionRepository>();
builder.Services.AddScoped<IQuestionAnswerRepository, QuestionAnswerRepository>();
builder.Services.AddScoped<IQuestionFavoriteRepository, QuestionFavoriteRepository>();
builder.Services.AddScoped<IQuestionLikeRepository, QuestionLikeRepository>();

builder.Services.AddSwaggerGen(o =>
{
	o.SwaggerDoc(
		"v1",
		new OpenApiInfo
		{
			Title = "Dev Space API",
			Version = "v1",
			Description =
				"An API that uses the OData protocol to provide a platform for developers to interact with one another.",
			Contact = new OpenApiContact
			{
				Name = "Jacob Dolorzo",
				Email = "jacob.dolorzo.96@gmail.com",
				Url = new Uri(configuration["Swagger:Contact"]!),
			},
		}
	);
	o.AddSecurityDefinition(
		JwtBearerDefaults.AuthenticationScheme,
		new OpenApiSecurityScheme
		{
			Name = "Authorization",
			Description = "Enter your JWT:",
			BearerFormat = "JWT",
			In = ParameterLocation.Header,
			Type = SecuritySchemeType.Http,
			Scheme = JwtBearerDefaults.AuthenticationScheme
		}
	);
	o.AddSecurityRequirement(
		new OpenApiSecurityRequirement
		{
			{
				new OpenApiSecurityScheme
				{
					Reference = new OpenApiReference
					{
						Type = ReferenceType.SecurityScheme,
						Id = JwtBearerDefaults.AuthenticationScheme
					}
				},
				Array.Empty<string>()
			}
		}
	);
});

WebApplication app = builder.Build();

app.UseDefaultFiles();

app.UseStaticFiles();

app.UseSwagger();

app.UseSwaggerUI();

app.UseHttpsRedirection();

app.UseRouting();

app.UseAuthorization();

app.UseCors();

app.MapControllers();

await app.RunAsync();
