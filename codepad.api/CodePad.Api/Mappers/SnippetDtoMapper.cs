using CodePad.Api.Dtos;
using CodePad.Domain.Model;

namespace CodePad.Api.Mappers
{
    public static class SnippetDtoMapper
    {
        public static Snippet ToDomain(this SnippetDto dto)
        {
            return new Snippet
            {
                UrlId = dto.UrlId,
                Content = dto.Content
            };
        }
    }
}