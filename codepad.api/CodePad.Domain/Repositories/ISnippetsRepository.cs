using CodePad.Domain.Model;

namespace CodePad.Domain.Repositories
{
    public interface ISnippetsRepository
    {
        Snippet CreateSnippet(Snippet snippet);
        Snippet GetByUrlId(string urlId);
    }
}