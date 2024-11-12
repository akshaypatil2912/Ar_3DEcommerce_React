# Base image for runtime
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 80

# Build image for SDK
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy project files
COPY ["AR_AuthorizationUser/AR_AuthorizationUser.csproj", "AR_AuthorizationUser/"]
COPY ["LibFiles/LIbFiles/LIbFiles.csproj", "LibFiles/LIbFiles/"]

# Restore dependencies
RUN dotnet restore "AR_AuthorizationUser/AR_AuthorizationUser.csproj"

# Copy the source files
COPY . .

# Exclude appsettings.json from publish
RUN sed -i '/<Project>/a <ItemGroup><None Update="appsettings.json"><CopyToPublishDirectory>Never</CopyToPublishDirectory></None></ItemGroup>' AR_AuthorizationUser/AR_AuthorizationUser.csproj

# Set the working directory, build, and publish
WORKDIR "/src/AR_AuthorizationUser"
RUN dotnet build -c Release -o /app/build
RUN dotnet publish -c Release -o /app/publish

# Final runtime image
FROM base AS final
WORKDIR /app

# Copy the publish output and appsettings.json files
COPY --from=publish /app/publish .
COPY ["AR_AuthorizationUser/appsettings.json", "./appsettings.json"]

ENTRYPOINT ["dotnet", "AR_AuthorizationUser.dll"]
