using Cassandra;
using CqlPoco;
using DataAccessService.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using ISession = Cassandra.ISession;

namespace DataAccessService.Controllers;

[ApiController]
[Route("api/[controller]/[action]")]
public class ProjectsController : ControllerBase
{
    private readonly ILogger<ProjectsController> _logger;
    private readonly ISession _session;

    public ProjectsController(ILogger<ProjectsController> logger, ISession session)
    {
        _logger = logger;
        _session = session;
    }

    [HttpGet(Name = "GetAllProjectsByUserId")]
    public IActionResult GetAllProjectsByUserId(Guid UserId)
    {
        ICqlClient client = CqlClientConfiguration.ForSession(_session).BuildCqlClient();
        
        var projects = client.Fetch<Project>("WHERE user_id = ?", UserId);
        
        return new JsonResult(projects);
    }
    
    [HttpGet(Name = "GetActiveProjectsByUserID")]
    public IActionResult GetActiveProjectsByUserID(Guid UserId)
    {
        ICqlClient client = CqlClientConfiguration.ForSession(_session).BuildCqlClient();
        
        var projects = client.Fetch<Project>("WHERE user_id = ?", UserId);
        
        return new JsonResult(projects.ToList().Where(p => p.IsTracked));
    }
    
    [HttpPost(Name = "AddProject")]
    public IActionResult AddProject(Project project)
    {
        if (project.UserId == null || project.ProjectId == null)
            return new BadRequestResult();
        
        ICqlClient client = CqlClientConfiguration.ForSession(_session).BuildCqlClient();

        try
        {
            client.Insert(project);
        }
        catch(Exception e)
        {
            _logger.Log(LogLevel.Error, $"Exception while adding a new project: {e.Message}");
            return new BadRequestResult();
        }

        return new OkResult();
    }
}