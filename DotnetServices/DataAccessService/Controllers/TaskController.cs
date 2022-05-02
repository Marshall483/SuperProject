using DataAccessService.Models;
using Microsoft.AspNetCore.Mvc;

namespace DataAccessService.Controllers;

[ApiController]
[Route("api/[controller]/[action]")]
public class TaskController
{
    private readonly ILogger<TaskController> _logger;

    public TaskController(ILogger<TaskController> logger)
    {
        _logger = logger;
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