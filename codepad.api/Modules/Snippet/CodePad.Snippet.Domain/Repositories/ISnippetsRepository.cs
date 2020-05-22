namespace CodePad.Snippet.Domain.Repositories
{
    public interface ISnippetsRepository
    {
        Models.Snippet CreateSnippet(Models.Snippet snippet);
        Models.Snippet GetByUrlId(string urlId);
    }
}