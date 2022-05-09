FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["DotnetServices/JiraScrapper/JiraScrapper.csproj", "JiraScrapper/"]
RUN dotnet restore "DotnetServices/JiraScrapper/JiraScrapper.csproj"
COPY . .
WORKDIR "/src/JiraScrapper"
RUN dotnet build "DotnetServices/JiraScrapper.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "DotnetServices/JiraScrapper.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "DotnetServices/JiraScrapper.dll"]