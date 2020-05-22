using System;
using CodePad.Domain.Model;

namespace CodePad.Domain.Services
{
    public interface ISnippetsService
    {
        Snippet CreateSnippet(Snippet snippet);
        Snippet GetById(Guid id);
        Snippet GetByUrlId(string urlId);
        string GenerateUniqueUrlId();
    }
}