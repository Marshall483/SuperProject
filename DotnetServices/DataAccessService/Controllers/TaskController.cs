using CqlPoco;
using DataAccessService.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using ISession = Cassandra.ISession;

namespace DataAccessService.Controllers;

[ApiController]
[Route("api/[controller]/[action]")]
public class TaskController : ControllerBase
{
    private readonly ILogger<TaskController> _logger;
    private readonly ISession _session;

    public TaskController(ILogger<TaskController> logger, ISession session)
    {
        _logger = logger;
        _session = session;
    }
    
    [HttpGet(Name = "GetTasksBySprintID")]
    public string GetTasksBySprintID(Guid SprintId)
    {
        ICqlClient client = CqlClientConfiguration.ForSession(_session).BuildCqlClient();
        
        var sprints = client.Fetch<Issue>("WHERE sprint_id = ?", SprintId);
        
        return JsonConvert.SerializeObject(sprints, Formatting.Indented);
    }
    
    [HttpPost(Name = "AddTask")]
    public IActionResult AddTask(string issuesJson)
    {
        if (string.IsNullOrEmpty(issuesJson))
            return new BadRequestResult();
        
        ICqlClient client = CqlClientConfiguration.ForSession(_session).BuildCqlClient();
        var issues = JsonConvert.DeserializeObject<List<Issue>>(issuesJson);


        try
        {
            client.Insert(issues);
        }
        catch(Exception e)
        {
            _logger.Log(LogLevel.Error, $"Exception while adding a new Issue: {e.Message}");
            return new BadRequestResult();
        }

        return new OkResult();
    }
}