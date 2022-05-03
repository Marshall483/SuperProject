﻿using System.Net.Http.Headers;
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
    public async Task<IActionResult> NewUserRegistration(string userId)
    {
        if (!Guid.TryParse(userId, out var userGuid))
        {
            _logger.Log(LogLevel.Information, "Mocks for invalid user`s guid were requested");
            return BadRequest();
        }
        
        var localhost = "172.0.0.1";
        var jiraScrapperPort = 8081;
        var endpointPath = "/Mock/ForNewUser";
        var userGuidJson = JsonConvert.SerializeObject(
            new UserGuidDTO {UserGuid = userGuid.ToString()});
        
        using (var client = new HttpClient())
        {
            var address = $"http://{localhost}:{jiraScrapperPort}{endpointPath}";

            client.BaseAddress = new Uri(address);
            client.DefaultRequestHeaders
                .Accept
                .Add(new MediaTypeWithQualityHeaderValue("application/json")); 

            var request = new HttpRequestMessage(HttpMethod.Post, "relativeAddress");

            request.Content = new StringContent(userGuidJson,
                Encoding.UTF8,
                "application/json");

            await client.SendAsync(request);
        }

        return new OkResult();
    }
}