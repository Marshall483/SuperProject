using System.Net.Http.Headers;
using System.Text;
using DataAccessService.DTO;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace DataAccessService.Controllers;

[ApiController]
[Route("api/[controller]/[action]")]
public class EventController : ControllerBase
{
    private readonly ILogger<EventController> _logger;

    public EventController(ILogger<EventController> logger)
    {
        _logger = logger;
    }
    
    [HttpPost(Name = "NewUserRegistration")]
    public async Task<IActionResult> NewUserRegistration([FromBody] UserGuidDTO userId)
    {

#if DEBUG
        var localhost = "127.0.0.1";
        var jiraScrapperPort = 5001;
#else
        var localhost = "jirascrapper";
        var jiraScrapperPort = 80;
#endif
        
        var endpointPath = "/api/Moq/ForNewUser";
        var userGuidJson = JsonConvert.SerializeObject(
            new UserGuidDTO {UserGuid = userId.UserGuid.ToString()});
        
        using (var client = new HttpClient())
        {
            var address = $"http://{localhost}:{jiraScrapperPort}{endpointPath}";

            client.BaseAddress = new Uri(address);
            client.DefaultRequestHeaders
                .Accept
                .Add(new MediaTypeWithQualityHeaderValue("application/json")); 

            var request = new HttpRequestMessage(HttpMethod.Post, address);

            request.Content = new StringContent(userGuidJson,
                Encoding.UTF8,
                "application/json");

            var res = await client.SendAsync(request);

            return res.IsSuccessStatusCode
                ? new OkResult()
                : BadRequest();
        }
    }
}