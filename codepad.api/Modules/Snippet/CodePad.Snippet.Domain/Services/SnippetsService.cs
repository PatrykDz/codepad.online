using System;
using CodePad.Snippet.Domain.Repositories;
using CodePad.Snippet.Domain.Services.Abstract;

namespace CodePad.Snippet.Domain.Services
{
    public class SnippetsService : ISnippetsService
    {
        private readonly ISnippetsRepository _snippetsRepository;

        public SnippetsService(ISnippetsRepository snippetsRepository)
        {
            _snippetsRepository = snippetsRepository;
        }

        public Models.Snippet CreateSnippet(Models.Snippet snippet)
        {
            return _snippetsRepository.CreateSnippet(snippet);
        }

        public Models.Snippet GetById(Guid id)
        {
            //var result = _collection.Find(x => x.Id == id).FirstOrDefault();
            //return result.ToDomain();t
            return new Models.Snippet();
        }

        public Models.Snippet GetByUrlId(string urlId)
        {
            return _snippetsRepository.GetByUrlId(urlId);
        }
    }
}