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
        using var dataContext = new CassandraDataContext(new[] { /* "cassandra-node1", "cassandra-node2", "cassandra-node3",*/ "127.0.0.1" }, "jira");
        
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
        
        using var dataContext = new CassandraDataContext(new[] { /*"cassandra-node1", "cassandra-node2", "cassandra-node3",*/ "127.0.0.1" }, "jira");

      /*  var builder = Cluster.Builder()
            .AddContactPoints(new[] {"cassandra-node1"})
            .WithPort(9042)
            .WithCredentials("cassandra", "cassandra")
            .WithRetryPolicy(new LoggingRetryPolicy(new DefaultRetryPolicy()));

        builder.WithLoadBalancingPolicy(
            new RetryLoadBalancingPolicy(
                new RoundRobinPolicy(), new ConstantReconnectionPolicy(1000)));

        using var dataContext = builder.Build().Connect("jira");*/

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