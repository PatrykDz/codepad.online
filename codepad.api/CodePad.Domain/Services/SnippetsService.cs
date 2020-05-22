using System;
using CodePad.Domain.Model;
using CodePad.Domain.Repositories;

namespace CodePad.Domain.Services
{
    public class SnippetsService : ISnippetsService
    {
        private readonly ISnippetsRepository _snippetsRepository;

        public SnippetsService(ISnippetsRepository snippetsRepository)
        {
            _snippetsRepository = snippetsRepository;
        }

        public Snippet CreateSnippet(Snippet snippet)
        {
            return _snippetsRepository.CreateSnippet(snippet);
        }

        public Snippet GetById(Guid id)
        {
            //var result = _collection.Find(x => x.Id == id).FirstOrDefault();
            //return result.ToDomain();t
            return new Snippet();
        }

        public Snippet GetByUrlId(string urlId)
        {
            return _snippetsRepository.GetByUrlId(urlId);
        }
    }
}