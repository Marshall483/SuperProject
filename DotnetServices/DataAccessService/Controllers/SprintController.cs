using DataAccessService.Models;
using Microsoft.AspNetCore.Mvc;

namespace DataAccessService.Controllers;

[ApiController]
[Route("api/[controller]/[action]")]
public class SprintController
{
    private readonly ILogger<SprintController> _logger;

    public SprintController(ILogger<SprintController> logger)
    {
        _logger = logger;
    }
    
    [HttpGet(Name = "GetSprintsByProjectID")]
    public string GetSprintsByProjectID(Guid UserId)
    {
        throw new NotImplementedException();
    }
    
    [HttpPost(Name = "AddSprint")]
    public string AddSprint(Sprint Sprint)
    {
        throw new NotImplementedException();
    }
}