using DataAccessService.Models;
using Microsoft.AspNetCore.Mvc;

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
    public string GetAllProjectsByUserId(Guid UserId)
    {
        throw new NotImplementedException();
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