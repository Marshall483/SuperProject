using Cassandra.NET;
using DataAccessService.Models;
using DataAccessService.Models.ReportModels;
using DataAccessService.OperationResult;
using Microsoft.AspNetCore.Mvc;

namespace DataAccessService.Controllers;

[ApiController]
[Route("api/[controller]/[action]")]
public class ReportController : ControllerBase
{
    private readonly ILogger<ReportController> _logger;

    public ReportController(ILogger<ReportController> logger)
    {
        _logger = logger;
    }

    [HttpGet(Name = "GetReportBySprintId")]
    public IActionResult GetReportBySprintId(string sprintId)
    {
        if (!Guid.TryParse(sprintId, out var sprintGuid))
        {
            return BadRequest("Invalid Guid was provided");
        }
        
        var getTasksResult = GetTasksBySprintId(sprintGuid);
        
        if(!getTasksResult.Success)
            return BadRequest("A problem occured when getting data");

        var cheese = new Cheese();
        var bars = new List<Bar>();

        cheese.AnalysisTasksAmount = getTasksResult.Result.Count(t => t.Status == "analysis");
        cheese.ClosedTasksAmount = getTasksResult.Result.Count(t => t.Status == "closed");
        cheese.InProgressTasksAmount = getTasksResult.Result.Count(t => t.Status == "in_progress");

        foreach (var task in getTasksResult.Result)
        {
            bars.Add(new Bar { EstimatedDueTimeInHours = task.EstimatedDueTimeInHours, TotalSpentTimeInHours = task.TotalSpentTimeInHours});
        }

        return new JsonResult(new Report {Cheese = cheese, Bars = bars});
    }
    
    private OperationResult<IEnumerable<Issue>, Exception> GetTasksBySprintId(Guid sprintId)
    {
        IEnumerable<Issue> issues = new List<Issue>();
        
#if DEBUG
        using var dataContext = new CassandraDataContext(new[] { "127.0.0.1" }, "jira");
#else
        using var dataContext = new CassandraDataContext(new[] { "cassandra-node1" /*, "cassandra-node2", "cassandra-node3" */  }, "jira");
#endif
        try
        {
            issues = dataContext.Select<Issue>(issue => issue.SprintId == sprintId);
        }
        catch (Exception ex)
        {
            return new FailedOperationResult<IEnumerable<Issue>, Exception>(ex); 
        }

        return new SucceededOperationResult<IEnumerable<Issue>, Exception>(issues);
    }
}