using Microsoft.AspNetCore.Mvc;

namespace CodePad.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SnippetController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get()
        {
            return Ok("It Works");
        }
    }
}