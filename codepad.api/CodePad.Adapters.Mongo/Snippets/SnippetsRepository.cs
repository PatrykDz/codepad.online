using CodePad.Adapters.Mongo.Dtos;
using CodePad.Adapters.Mongo.Mappers;
using CodePad.Domain.Model;
using CodePad.Domain.Repositories;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace CodePad.Adapters.Mongo.Snippets
{
    public class SnippetsRepository : ISnippetsRepository
    {
        private const string DatabaseName = "SnippetsDb";
        private const string CollectionName = "Snippets";

        private readonly IOptions<MongoConfig> _config;

        public SnippetsRepository(IOptions<MongoConfig> config)
        {
            _config = config;

            _client = MongoInitializer.Init(_config.Value.ConnectionString);
            _database = _client.GetDatabase(DatabaseName);
            _collection = _database.GetCollection<SnippetDto>(CollectionName);
        }

        private readonly MongoClient _client;
        private readonly IMongoDatabase _database;
        private readonly IMongoCollection<SnippetDto> _collection;

        public Snippet CreateSnippet(Snippet snippet)
        {
            var snippetDto = new SnippetDto(snippet);
            _collection.InsertOne(snippetDto);
            return snippet;
        }

        public Snippet GetByUrlId(string urlId)
        {
            var result =
                _collection
                    .Find(x => x.UrlId == urlId)
                    .SortByDescending(x => x.ModifiedDate)
                    .FirstOrDefault();
            return result == null
                ? new Snippet()
                : result.ToDomain();
        }
    }
}