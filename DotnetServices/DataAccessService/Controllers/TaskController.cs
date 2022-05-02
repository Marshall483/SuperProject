using DataAccessService.Models;
using Microsoft.AspNetCore.Mvc;
using ISession = Cassandra.ISession;

namespace DataAccessService.Controllers;

[ApiController]
[Route("api/[controller]/[action]")]
public class TaskController : ControllerBase
{
    private readonly ILogger<TaskController> _logger;
    private readonly ISession _session;

    public TaskController(ILogger<TaskController> logger, ISession session)
    {
        _logger = logger;
        _session = session;
    }
    
    [HttpGet(Name = "GetTasksBySprintID")]
    public string GetTasksBySprintID(Guid SprintId)
    {
        throw new NotImplementedException();
    }
    
    [HttpPost(Name = "AddTask")]
    public string AddTask(Issue Issue)
    {
        throw new NotImplementedException();
    }
}