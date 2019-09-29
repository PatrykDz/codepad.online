using System;
using CodePad.Adapters.Mongo.Dtos;
using CodePad.Adapters.Mongo.Mappers;
using CodePad.Domain.Model;
using CodePad.Domain.Repositories;
using MongoDB.Driver;

namespace CodePad.Adapters.Mongo.Snippets
{
    public class SnippetsService : ISnippetsService
    {
        private const string DatabaseName = "SnippetsDb";
        private const string CollectionName = "Snippets";
        
        private readonly MongoClient _client;
        private readonly IMongoDatabase _database;
        private readonly IMongoCollection<SnippetDto> _collection;
        
        public SnippetsService()
        {
            _client = MongoInitializer.Init();
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
            var result = _collection.Find(x => x.UrlId == urlId).FirstOrDefault();
            return result == null 
                ? new Snippet() 
                : result.ToDomain();
        }
    }
}