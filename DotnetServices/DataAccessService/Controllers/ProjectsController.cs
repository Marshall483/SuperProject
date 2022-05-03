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
    public string GetAllProjectsByUserId(Guid UserId)
    {
        ICqlClient client = CqlClientConfiguration.ForSession(_session).BuildCqlClient();
        
        var projects = client.Fetch<Project>("WHERE user_id = ?", UserId);
        
        return JsonConvert.SerializeObject(projects, Formatting.Indented);
    }
    
    [HttpGet(Name = "GetActiveProjectsByUserID")]
    public string GetActiveProjectsByUserID(Guid UserId)
    {
        ICqlClient client = CqlClientConfiguration.ForSession(_session).BuildCqlClient();
        
        var projects = client.Fetch<Project>("WHERE user_id = ?", UserId);
        
        return JsonConvert.SerializeObject(projects.ToList().Where(p => p.IsTracked), Formatting.Indented);

    }
    
    [HttpPost(Name = "AddProject")]
    public IActionResult AddProject(string projectsJson)
    {
        if (string.IsNullOrEmpty(projectsJson))
            return new BadRequestResult();

        ICqlClient client = CqlClientConfiguration.ForSession(_session).BuildCqlClient();
        var projects = JsonConvert.DeserializeObject<List<Project>>(projectsJson);
        
        try
        {
            client.Insert(projects);
        }
        catch(Exception e)
        {
            _logger.Log(LogLevel.Error, $"Exception while adding a new project: {e.Message}");
            return new BadRequestResult();
        }

        return new OkResult();
    }
}