using System;
using CodePad.Domain.Model;

namespace CodePad.Domain.Repositories
{
    public interface ISnippetsService
    {
        Snippet CreateSnippet(Snippet snippet);
        Snippet GetById(Guid id);
        Snippet GetByUrlId(string urlId);
    }
}