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
            ? new JsonResult(JsonConvert.SerializeObject(getProjectsResult.Result, Formatting.Indented))
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
            ? new JsonResult(JsonConvert.SerializeObject(getProjectsResult.Result.Where(p => p.IsTracked), Formatting.Indented))
            : BadRequest(getProjectsResult.Error.Message);
    }
    
    [HttpPost(Name = "AddProject")]
    public IActionResult AddProject(string projectsJson)
    {
        if (string.IsNullOrEmpty(projectsJson))
            return BadRequest("Empty json");

        using var dataContext = new CassandraDataContext(new[] { "127.0.0.1" }, "jira");
        var projects = JsonConvert.DeserializeObject<List<Project>>(projectsJson);
        
        try
        {
            dataContext.AddOrUpdate(projects);
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
        
        using var dataContext = new CassandraDataContext(new[] { "127.0.0.1" }, "jira");
        
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