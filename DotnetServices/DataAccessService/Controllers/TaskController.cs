using Cassandra;
using Cassandra.NET;
using Cassandra.NET.Helpers;
using DataAccessService.Models;
using DataAccessService.OperationResult;
using Microsoft.AspNetCore.Http.Extensions;
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
        
        var getSprintsResult = GetTasksBySprintId(sprintId);
        
        return getSprintsResult.Success
            ? new JsonResult(getSprintsResult.Result)
            : BadRequest(getSprintsResult.Error.Message);
    }
    
    [HttpPost(Name = "AddTask")]
    public IActionResult AddTask([FromBody] List<Issue> issues)
    {
#if DEBUG
        using var dataContext = new CassandraDataContext(new[] { "127.0.0.1" }, "jira");
#else
        using var dataContext = new CassandraDataContext(new[] { "cassandra-node1" /*, "cassandra-node2", "cassandra-node3" */  }, "jira");
#endif
        
        try
        {
            foreach (var issue in issues)
            {
                dataContext.AddOrUpdate(issue);
            }        
        }
        catch(Exception e)
        {
            _logger.Log(LogLevel.Error, $"Exception while adding a new Issue: {e.Message}");
            return new BadRequestResult();
        }

        return new OkResult();
    }
    
    private OperationResult<IEnumerable<Issue>, Exception> GetTasksBySprintId(Guid sprintId)
    {
        IEnumerable<Issue> issues = new List<Issue>();
        
#if DEBUG
        using var dataContext = new CassandraDataContext(new[] { "127.0.0.1" }, "jira");
#else
        using var dataContext = new CassandraDataContext(new[] { "cassandra-node1" /*, "cassandra-node2", "cassandra-node3" */  }, "jira");
#endif
        
        try
        {
            issues = dataContext.Select<Issue>(issue => issue.SprintId == sprintId);
        }
        catch (Exception ex)
        {
            return new FailedOperationResult<IEnumerable<Issue>, Exception>(ex); 
        }

        return new SucceededOperationResult<IEnumerable<Issue>, Exception>(issues);
    }
}