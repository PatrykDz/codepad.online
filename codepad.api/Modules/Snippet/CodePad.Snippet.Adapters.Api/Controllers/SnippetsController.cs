using System;
using CodePad.Snippet.Adapters.Api.Dtos;
using CodePad.Snippet.Adapters.Api.Mappers;
using CodePad.Snippet.Domain.Services.Abstract;
using Microsoft.AspNetCore.Mvc;

namespace CodePad.Snippet.Adapters.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SnippetsController : ControllerBase
    {
        private readonly ISnippetsService _snippetsService;
        private readonly ISnippetsUrlService _snippetsUrlService;

        public SnippetsController(
            ISnippetsService snippetsService, 
            ISnippetsUrlService snippetsUrlService)
        {
            _snippetsService = snippetsService;
            _snippetsUrlService = snippetsUrlService;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok("It Works");
        }

        [HttpGet]
        [Route("{urlId}")]
        public IActionResult Get([FromRoute] string urlId)
        {
            var snippet = _snippetsService.GetByUrlId(urlId);
            if (snippet == null)
            {
                return NotFound();
            }

            return Ok(snippet);
        }

        [HttpGet]
        [Route("newUrlId")]
        public IActionResult GetNewUrlId()
        {
            var urlId = _snippetsUrlService.GenerateUniqueUrlId();
            return Ok(new {urlId});
        }

        [HttpPost]
        [Route("{urlId}")]
        public IActionResult Create(
            [FromRoute] string urlId,
            [FromBody] SnippetDto snippetDto)
        {
            if (snippetDto == null)
            {
                return BadRequest();
            }

            var snippet = snippetDto.ToDomain();
            snippet.UrlId = urlId;
            snippet.ModifiedDate = DateTime.Now;

            _snippetsService.CreateSnippet(snippet);
            return Ok();
        }
    }
}