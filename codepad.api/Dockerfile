FROM mcr.microsoft.com/dotnet/core/sdk:3.0 AS base
WORKDIR /app
EXPOSE 5000 5001
ENV ASPNETCORE_URLS http://+:5000;https://+:5001

FROM mcr.microsoft.com/dotnet/core/sdk:3.0 AS build
WORKDIR /src
COPY CodePad.sln ./
COPY Modules/Snippet/CodePad.Snippet.Adapters.Api/*.csproj ./Modules/Snippet/CodePad.Snippet.Adapters.Api/
COPY Modules/Snippet/CodePad.Snippet.Domain/*.csproj ./Modules/Snippet/CodePad.Snippet.Domain/
COPY Modules/Snippet/CodePad.Snippet.Adapters.Mongo/*.csproj ./Modules/Snippet/CodePad.Snippet.Adapters.Mongo/

RUN dotnet restore
COPY . .
WORKDIR /src/
RUN dotnet build -c Release -o /app

FROM build AS publish
RUN dotnet publish -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "CodePad.Snippet.Adapters.Api.dll"]