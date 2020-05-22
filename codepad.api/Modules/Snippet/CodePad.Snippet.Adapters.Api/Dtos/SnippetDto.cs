namespace CodePad.Snippet.Adapters.Api.Dtos
{
    public class SnippetDto
    {
        public string Id { get; set; }
        public string UrlId { get; set; }
        // public DateTime CreatedDate { get; set; }
        // public DateTime ModifiedDate { get; set; }
        public string Content { get; set; }

        public SnippetDto()
        { }
        
        public SnippetDto(Domain.Models.Snippet snippet)
        {
            //Id = snippet.Id;
            UrlId = snippet.UrlId;
            Content = snippet.Content;
        }
    }
}