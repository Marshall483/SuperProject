using Cassandra.NET;
using DataAccessService.Models;
using DataAccessService.OperationResult;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace DataAccessService.Controllers;

[ApiController]
[Route("api/[controller]/[action]")]
public class SprintController : ControllerBase
{
    private readonly ILogger<SprintController> _logger;
    private readonly ISession _session;
    
    public SprintController(ILogger<SprintController> logger)
    {
        _logger = logger;
    }
    
    [HttpGet(Name = "GetSprintsByProjectID")]
    public IActionResult GetSprintsByProjectID(string ProjectId)
    {
        if (!Guid.TryParse(ProjectId, out var projectId))
        {
            return BadRequest("Invalid Guid was provided");
        }

        var getSprintsResult = GetSprintsByProjectId(projectId);

        return getSprintsResult.Success
            ? new JsonResult(getSprintsResult.Result)
            : BadRequest(getSprintsResult.Error.Message);
    }
    
    [HttpPost(Name = "AddSprint")]
    public IActionResult AddSprint([FromBody] List<Sprint> sprints)
    {
#if DEBUG
        using var dataContext = new CassandraDataContext(new[] { "127.0.0.1" }, "jira");
#else
        using var dataContext = new CassandraDataContext(new[] { "cassandra-node1", "cassandra-node2", "cassandra-node3"  }, "jira");
#endif     
        
        try
        {
            foreach (var sptint in sprints)
            {
                dataContext.AddOrUpdate(sptint);
            }
        }
        catch(Exception e)
        {
            _logger.Log(LogLevel.Error, $"Exception while adding a new Sprint: {e.Message}");
            return new BadRequestResult();
        }

        return new OkResult();
    }
    
    private OperationResult<IEnumerable<Sprint>, Exception> GetSprintsByProjectId(Guid projectId)
    {
        IEnumerable<Sprint> sprints = new List<Sprint>();
        
#if DEBUG
        using var dataContext = new CassandraDataContext(new[] { "127.0.0.1" }, "jira");
#else
        using var dataContext = new CassandraDataContext(new[] { "cassandra-node1", "cassandra-node2", "cassandra-node3"  }, "jira");
#endif      
        
        try
        {
            sprints = dataContext.Select<Sprint>(p => p.ProjectId == projectId);
        }
        catch (Exception ex)
        {
            return new FailedOperationResult<IEnumerable<Sprint>, Exception>(ex); 
        }

        return new SucceededOperationResult<IEnumerable<Sprint>, Exception>(sprints);
    }
}