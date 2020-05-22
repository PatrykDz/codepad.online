using System;
using System.Linq;
using CodePad.Adapters.Mongo.Dtos;
using CodePad.Adapters.Mongo.Mappers;
using CodePad.Domain.Model;
using CodePad.Domain.Services;
using HashidsNet;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace CodePad.Adapters.Mongo.Snippets
{
    public class SnippetsService : ISnippetsService
    {
        private const string DatabaseName = "SnippetsDb";
        private const string CollectionName = "Snippets";

        private readonly IOptions<MongoConfig> _config;

        private readonly MongoClient _client;
        private readonly IMongoDatabase _database;
        private readonly IMongoCollection<SnippetDto> _collection;

        public SnippetsService(IOptions<MongoConfig> config)
        {
            _config = config;

            _client = MongoInitializer.Init(_config.Value.ConnectionString);
            _database = _client.GetDatabase(DatabaseName);
            _collection = _database.GetCollection<SnippetDto>(CollectionName);
        }

        public Snippet CreateSnippet(Snippet snippet)
        {
            var snippetDto = new SnippetDto(snippet);
            _collection.InsertOne(snippetDto);
            return snippet;
        }

        public Snippet GetById(Guid id)
        {
            //var result = _collection.Find(x => x.Id == id).FirstOrDefault();
            //return result.ToDomain();t
            return new Snippet();
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

        public string GenerateUniqueUrlId()
        {
            var hashIds = new Hashids("codepad");
            var mStr = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds().ToString();

            var nextRandom = new Random().Next(0, 9).ToString().First();

            var firstPart = string.Join(string.Empty, mStr.Take(6));
            var secondPart = string.Join(string.Empty, mStr.Skip(6).Take(6).Append(nextRandom));

            var array = new[] { int.Parse(firstPart), int.Parse(secondPart) };
            var urlId = hashIds.Encode(array);

            return urlId;
        }
    }
}