FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["DotnetServices/DataAccessService/DataAccessService.csproj", "DataAccessService/"]
RUN dotnet restore "DotnetServices/DataAccessService/DataAccessService.csproj"
COPY . .
WORKDIR "DotnetServices/src/DataAccessService"
RUN dotnet build "DotnetServices/DataAccessService.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "DotnetServices/DataAccessService.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "DotnetServices/DataAccessService.dll"]
