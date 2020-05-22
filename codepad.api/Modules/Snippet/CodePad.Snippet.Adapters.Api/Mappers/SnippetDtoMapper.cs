using CodePad.Snippet.Adapters.Api.Dtos;

namespace CodePad.Snippet.Adapters.Api.Mappers
{
    public static class SnippetDtoMapper
    {
        public static Domain.Models.Snippet ToDomain(this SnippetDto dto)
        {
            return new Domain.Models.Snippet
            {
                UrlId = dto.UrlId,
                Content = dto.Content
            };
        }
    }
}