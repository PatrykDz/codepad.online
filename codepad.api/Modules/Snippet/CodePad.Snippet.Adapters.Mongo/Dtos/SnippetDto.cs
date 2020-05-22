using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace CodePad.Snippet.Adapters.Mongo.Dtos
{
    public class SnippetDto
    {
        [BsonId]
        [BsonElement("id")]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public string UrlId { get; set; }
        // public DateTime CreatedDate { get; set; }
        
        [BsonDateTimeOptions(Kind = DateTimeKind.Utc)]
        public DateTime ModifiedDate { get; set; }
        public string Content { get; set; }

        public SnippetDto(Domain.Models.Snippet snippet)
        {
            //Id = snippet.Id;
            UrlId = snippet.UrlId;
            Content = snippet.Content;
            ModifiedDate = snippet.ModifiedDate;
        }
    }
}