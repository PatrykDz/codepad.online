using System;
using CodePad.Domain.Model;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace CodePad.Adapters.Mongo.Dtos
{
    public class SnippetDto
    {
        [BsonId]
        [BsonElement("id")]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public string UrlId { get; set; }
        // public DateTime CreatedDate { get; set; }
        // public DateTime ModifiedDate { get; set; }
        public string Content { get; set; }

        public SnippetDto(Snippet snippet)
        {
            //Id = snippet.Id;
            UrlId = snippet.UrlId;
            Content = snippet.Content;
        }
    }
}