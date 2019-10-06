FROM mcr.microsoft.com/dotnet/core/sdk:3.0 AS base
WORKDIR /app
EXPOSE 5000 5001
ENV ASPNETCORE_URLS http://+:5000;https://+:5001

FROM mcr.microsoft.com/dotnet/core/sdk:3.0 AS build
WORKDIR /src
COPY CodePad.sln ./
COPY CodePad.Api/*.csproj ./CodePad.Api/
COPY CodePad.Domain/*.csproj ./CodePad.Domain/
COPY CodePad.Adapters.Mongo/*.csproj ./CodePad.Adapters.Mongo/

RUN dotnet restore
COPY . .
WORKDIR /src/
RUN dotnet build -c Release -o /app

FROM build AS publish
RUN dotnet publish -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "CodePad.Api.dll"]