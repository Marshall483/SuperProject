using Cassandra.NET;
using DataAccessService.Models;
using DataAccessService.OperationResult;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace DataAccessService.Controllers;

[ApiController]
[Route("api/[controller]/[action]")]
public class TaskController : ControllerBase
{
    private readonly ILogger<TaskController> _logger;

    public TaskController(ILogger<TaskController> logger)
    {
        _logger = logger;
    }
    
    [HttpGet(Name = "GetTasksBySprintID")]
    public IActionResult GetTasksBySprintID(string SprintId)
    {
        if (!Guid.TryParse(SprintId, out var sprintId))
        {
            return BadRequest("Invalid Guid was provided");
        }
        
        var getSprintsResult = GetSprintsBySprintId(sprintId);
        
        return getSprintsResult.Success
            ? new JsonResult(getSprintsResult.Result)
            : BadRequest(getSprintsResult.Error.Message);
    }
    
    [HttpPost(Name = "AddTask")]
    public IActionResult AddTask(string issuesJson)
    {
        if (string.IsNullOrEmpty(issuesJson))
            return new BadRequestResult();
        
        using var dataContext = new CassandraDataContext(new[] { "127.0.0.1" }, "jira");
        var issues = JsonConvert.DeserializeObject<List<Issue>>(issuesJson);

        try
        {
            dataContext.AddOrUpdate(issues);
        }
        catch(Exception e)
        {
            _logger.Log(LogLevel.Error, $"Exception while adding a new Issue: {e.Message}");
            return new BadRequestResult();
        }

        return new OkResult();
    }
    
    private OperationResult<IEnumerable<Issue>, Exception> GetSprintsBySprintId(Guid sprintId)
    {
        IEnumerable<Issue> issues = new List<Issue>();
        
        using var dataContext = new CassandraDataContext(new[] { "127.0.0.1" }, "jira");
        
        try
        {
            issues = dataContext.Select<Issue>(p => p.SprintId == sprintId);
        }
        catch (Exception ex)
        {
            return new FailedOperationResult<IEnumerable<Issue>, Exception>(ex); 
        }

        return new SucceededOperationResult<IEnumerable<Issue>, Exception>(issues);
    }
}