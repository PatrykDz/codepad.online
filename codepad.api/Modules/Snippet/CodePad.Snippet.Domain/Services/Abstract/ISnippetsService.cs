using System;

namespace CodePad.Snippet.Domain.Services.Abstract
{
    public interface ISnippetsService
    {
        Models.Snippet CreateSnippet(Models.Snippet snippet);
        Models.Snippet GetById(Guid id);
        Models.Snippet GetByUrlId(string urlId);
    }
}