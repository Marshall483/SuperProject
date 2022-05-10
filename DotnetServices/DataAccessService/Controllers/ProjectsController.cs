using Cassandra.NET;
using DataAccessService.Models;
using DataAccessService.OperationResult;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace DataAccessService.Controllers;

[ApiController]
[Route("api/[controller]/[action]")]
public class ProjectsController : ControllerBase
{
    private readonly ILogger<ProjectsController> _logger;

    public ProjectsController(ILogger<ProjectsController> logger)
    {
        _logger = logger;
    }

    [HttpGet(Name = "GetAllProjectsByUserId")]
    public IActionResult GetAllProjectsByUserId(string UserId)
    {
        if (!Guid.TryParse(UserId, out var userId))
        {
            return BadRequest("Invalid Guid was provided");
        }

        var getProjectsResult = GetProjectsByUserId(userId);

        return getProjectsResult.Success
            ? new JsonResult(getProjectsResult.Result)
            : BadRequest(getProjectsResult.Error.Message);
    }
    
    [HttpGet(Name = "GetActiveProjectsByUserID")]
    public IActionResult GetActiveProjectsByUserID(string UserId)
    {
        if (!Guid.TryParse(UserId, out var userId))
        {
            return BadRequest("Invalid Guid was provided");
        }

        var getProjectsResult = GetProjectsByUserId(userId);
        
        return getProjectsResult.Success
            ? new JsonResult(getProjectsResult.Result.Where(p => p.IsTracked))
            : BadRequest(getProjectsResult.Error.Message);
    }
    
    [HttpPost(Name = "AddOrUpdateProject")]
    public IActionResult AddOrUpdateProject([FromBody] List<Project> projects)
    {
#if DEBUG
        using var dataContext = new CassandraDataContext(new[] { "127.0.0.1" }, "jira");
#else
        using var dataContext = new CassandraDataContext(new[] { "cassandra-node1" /*, "cassandra-node2", "cassandra-node3" */  }, "jira");
#endif        
        try
        {
            foreach (var project in projects)
            {
                dataContext.AddOrUpdate(project);
            }
        }
        catch(Exception e)
        {
            _logger.Log(LogLevel.Error, $"Exception while adding a new project: {e.Message}");
            return new BadRequestResult();
        }

        return new OkResult();
    }

    private OperationResult<IEnumerable<Project>, Exception> GetProjectsByUserId(Guid userId)
    {
        IEnumerable<Project> projects = new List<Project>();

#if DEBUG
        using var dataContext = new CassandraDataContext(new[] { "127.0.0.1" }, "jira");
#else
        using var dataContext = new CassandraDataContext(new[] { "cassandra-node1" /*, "cassandra-node2", "cassandra-node3" */  }, "jira");
#endif
        
        try
        {
            projects = dataContext.Select<Project>(p => p.UserId == userId);
        }
        catch (Exception ex)
        {
            return new FailedOperationResult<IEnumerable<Project>, Exception>(ex); 
        }

        return new SucceededOperationResult<IEnumerable<Project>, Exception>(projects);
    }
}