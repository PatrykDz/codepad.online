using System;
using System.Linq;
using CodePad.Domain.Services;
using HashidsNet;

namespace CodePad.Api.Services
{
    public class SnippetsUrlService : ISnippetsUrlService
    {
        public string GenerateUniqueUrlId()
        {
            var hashIds = new Hashids("codepad");
            var mStr = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds().ToString();

            var nextRandom = new Random().Next(0, 9).ToString().First();

            var firstPart = string.Join(string.Empty, mStr.Take(6));
            var secondPart = string.Join(string.Empty, mStr.Skip(6).Take(6).Append(nextRandom));

            var array = new[] { int.Parse(firstPart), int.Parse(secondPart) };
            var urlId = hashIds.Encode(array);

            return urlId;
        }
    }
}