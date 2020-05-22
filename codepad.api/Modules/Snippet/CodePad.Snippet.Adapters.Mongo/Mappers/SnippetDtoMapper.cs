using CodePad.Snippet.Adapters.Mongo.Dtos;

namespace CodePad.Snippet.Adapters.Mongo.Mappers
{
    public static class SnippetDtoMapper
    {
        public static Domain.Models.Snippet ToDomain(this SnippetDto dto)
        {
            return new Domain.Models.Snippet
            {
                UrlId = dto.UrlId,
                Content = dto.Content,
                ModifiedDate = dto.ModifiedDate
            };
        }
    }
}