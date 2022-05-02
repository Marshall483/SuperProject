using DataAccessService.Models;
using Microsoft.AspNetCore.Mvc;
using ISession = Cassandra.ISession;

namespace DataAccessService.Controllers;

[ApiController]
[Route("api/[controller]/[action]")]
public class SprintController : ControllerBase
{
    private readonly ILogger<SprintController> _logger;
    private readonly ISession _session;
    
    public SprintController(ILogger<SprintController> logger, ISession session)
    {
        _logger = logger;
        _session = session;
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