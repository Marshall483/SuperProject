FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["DotnetServices/Gateway/Gateway.csproj", "Gateway/"]
RUN dotnet restore "-DotnetServices/Gateway/Gateway.csproj"
COPY . .
WORKDIR "DotnetServices/src/Gateway"
RUN dotnet build "DotnetServices/Gateway.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "DotnetServices/Gateway.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "DotnetServices/Gateway.dll"]
