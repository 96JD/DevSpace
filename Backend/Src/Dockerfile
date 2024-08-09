FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base

WORKDIR /dev-space

EXPOSE 8080
EXPOSE 8081

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

WORKDIR /src

COPY ["DevSpace.csproj", "."]

RUN dotnet restore "./DevSpace.csproj"

COPY . .

WORKDIR "/src/."

RUN dotnet build "./DevSpace.csproj" -c Release -o /dev-space/build

FROM build AS publish

RUN dotnet publish "./DevSpace.csproj" -c Release -o /dev-space/publish /p:UseAppHost=false

FROM base AS final

WORKDIR /dev-space

COPY --from=publish /dev-space/publish .

ENTRYPOINT ["dotnet", "DevSpace.dll"]