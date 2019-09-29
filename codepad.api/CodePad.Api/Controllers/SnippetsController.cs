using System;
using CodePad.Api.Dtos;
using CodePad.Api.Mappers;
using CodePad.Domain.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace CodePad.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SnippetsController : ControllerBase
    {
        private readonly ISnippetsService _snippetsService;
        
        public SnippetsController(ISnippetsService snippetsService)
        {
            _snippetsService = snippetsService;
        }
        
        [HttpGet]
        public IActionResult Get()
        {
            return Ok("It Works");
        }

        [Route("{urlId}")]
        public IActionResult Get([FromRoute]string urlId)
        {
            var snippet = _snippetsService.GetByUrlId(urlId);
            if (snippet == null)
            {
                return NotFound();
            }

            return Ok(snippet);
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