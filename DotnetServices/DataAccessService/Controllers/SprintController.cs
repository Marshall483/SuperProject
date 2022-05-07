﻿using Cassandra.NET;
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
            ? new JsonResult(JsonConvert.SerializeObject(getSprintsResult.Result, Formatting.Indented))
            : BadRequest(getSprintsResult.Error.Message);
    }
    
    [HttpPost(Name = "AddSprint")]
    public IActionResult AddSprint(string sprintJson)
    {
        if (string.IsNullOrEmpty(sprintJson))
            return new BadRequestResult();
        
        using var dataContext = new CassandraDataContext(new[] { "127.0.0.1" }, "jira");
        var sprint = JsonConvert.DeserializeObject<List<Sprint>>(sprintJson);
        
        try
        {
            dataContext.AddOrUpdate(sprint);
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
        
        using var dataContext = new CassandraDataContext(new[] { "127.0.0.1" }, "jira");
        
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