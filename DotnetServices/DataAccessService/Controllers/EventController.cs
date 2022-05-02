using Microsoft.AspNetCore.Mvc;

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
    public string NewUserRegistration(Guid userId)
    {
        throw new NotImplementedException();
    }
}