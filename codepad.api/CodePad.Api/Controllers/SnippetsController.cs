using System;
using System.Linq;
using CodePad.Api.Dtos;
using CodePad.Api.Mappers;
using CodePad.Domain.Repositories;
using HashidsNet;
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
            var hashIds = new Hashids("codepad");
            var mStr = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds().ToString();

            var nextRandom = new Random().Next(0, 9).ToString().First();
            
            var firstPart = string.Join(string.Empty, mStr.Take(6));
            var secondPart = string.Join(string.Empty, mStr.Skip(6).Take(6).Append(nextRandom));
            
            var array = new[] { int.Parse(firstPart), int.Parse(secondPart)};
            var id = hashIds.Encode(array);

            return Ok(new {array, id});
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