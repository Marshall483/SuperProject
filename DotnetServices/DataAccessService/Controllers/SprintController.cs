using CqlPoco;
using DataAccessService.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using ISession = Cassandra.ISession;

namespace DataAccessService.Controllers;

[ApiController]
[Route("api/[controller]/[action]")]
public class SprintController : ControllerBase
{
    private readonly ILogger<SprintController> _logger;
    private readonly ISession _session;
    
    public SprintController(ILogger<SprintController> logger, ISession session)
    {
        _logger = logger;
        _session = session;
    }
    
    [HttpGet(Name = "GetSprintsByProjectID")]
    public string GetSprintsByProjectID(Guid ProjectId)
    {
        ICqlClient client = CqlClientConfiguration.ForSession(_session).BuildCqlClient();
        
        var sprints = client.Fetch<Sprint>("WHERE project_id = ?", ProjectId);
        
        return JsonConvert.SerializeObject(sprints, Formatting.Indented);
    }
    
    [HttpPost(Name = "AddSprint")]
    public IActionResult AddSprint(string sprintJson)
    {
        if (string.IsNullOrEmpty(sprintJson))
            return new BadRequestResult();
        
        ICqlClient client = CqlClientConfiguration.ForSession(_session).BuildCqlClient();
        var sprints = JsonConvert.DeserializeObject<List<Sprint>>(sprintJson);
        
        try
        {
            client.Insert(sprints);
        }
        catch(Exception e)
        {
            _logger.Log(LogLevel.Error, $"Exception while adding a new Sprint: {e.Message}");
            return new BadRequestResult();
        }

        return new OkResult();
    }
}