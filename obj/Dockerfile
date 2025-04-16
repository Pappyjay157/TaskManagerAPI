# Use the official .NET SDK image to build and run the application
FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["TaskManagerAPI.csproj", "./"]
RUN dotnet restore "TaskManagerAPI.csproj"
COPY . .
WORKDIR "/src/"
RUN dotnet build "TaskManagerAPI.csproj" -c Release -o /app/build
RUN dotnet publish "TaskManagerAPI.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "TaskManagerAPI.dll"]
