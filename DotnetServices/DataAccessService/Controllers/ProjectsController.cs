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
    public string GetAllProjectsByUserId(Guid UserId)
    {
        ICqlClient client = CqlClientConfiguration.ForSession(_session).BuildCqlClient();
        var projects = client.Fetch<Project>("WHERE project_id = ?", UserId);
        
        return projects != null && projects.Any()
            ? JsonConvert.SerializeObject(projects, Formatting.Indented) 
            : "";
    }
    
    [HttpGet(Name = "GetActiveProjectsByUserID")]
    public string GetActiveProjectsByUserID(Guid UserId)
    {
        throw new NotImplementedException();
    }
    
    [HttpPost(Name = "AddProject")]
    public string AddProject(Project project)
    {
        throw new NotImplementedException();
    }
}