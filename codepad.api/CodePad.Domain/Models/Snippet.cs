using System;

namespace CodePad.Domain.Model
{
    public class Snippet
    {
        public Guid? Id { get; set; }
        public string UrlId { get; set; }
        // public DateTime CreatedDate { get; set; }
        // public DateTime ModifiedDate { get; set; }
        public string Content { get; set; }
    }
}