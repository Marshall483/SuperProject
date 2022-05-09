using JiraScrapper.DTO;
using JiraScrapper.JsonSender.Abstractions;
using JiraScrapper.MocksGenerator.Abstractions;
using JiraScrapper.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace JiraScrapper.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class MoqController : ControllerBase
    {
        private readonly ILogger<MoqController> _logger;
        private readonly IProjectMoqer _project;
        private readonly ISprintMoqer _sprint;
        private readonly IIssueMoqer _issue;

        private readonly IJsonSender _sender;

        public MoqController(ILogger<MoqController> logger, IProjectMoqer project, 
            ISprintMoqer sprint, IIssueMoqer issue, IJsonSender sender)
        {
            _logger = logger;
            _project = project;
            _sprint = sprint;
            _issue = issue;
            _sender = sender;
        }
        
        [HttpPost(Name = "ForNewUser")]
        public async Task<IActionResult> ForNewUser([FromBody] UserGuidDTO userGuidDto)
        {
            var userGuid = Guid.Parse(userGuidDto.UserGuid);
            
            var projects = _project.NewProjectForUserId(userGuid, Random.Shared.Next(1,6));
            var sprints = _sprint.ForProject(projects, Random.Shared.Next(5,11));
            var issues = _issue.ForSprints(sprints,projects.Select(p => p.ProjectName).ToList(), Random.Shared.Next(10, 31));
            
            var jsonProject = JsonConvert.SerializeObject(projects, Formatting.Indented);
            var jsonSprint = JsonConvert.SerializeObject(sprints, Formatting.Indented);
            var jsonIssue = JsonConvert.SerializeObject(issues, Formatting.Indented);

#if DEBUG
            var localhost = "127.0.0.1";
            var dataAccessServicePort = 5003;
#else
            var localhost = "dataaccessservice";
            var dataAccessServicePort = 80;
#endif
            
            var tasks = new List<Task>
            {
                _sender.SendPost(localhost, dataAccessServicePort, "/api/Projects/AddOrUpdateProject", jsonProject,
                    LogSuccess(nameof(Project))),
                _sender.SendPost(localhost, dataAccessServicePort, "/api/Sprint/AddSprint", jsonSprint,
                    LogSuccess(nameof(Sprint))),
                _sender.SendPost(localhost, dataAccessServicePort, "/api/Task/AddTask", jsonIssue,
                    LogSuccess(nameof(Issue)))
            };

            await Task.WhenAll(tasks);

            return new OkResult();
        }

        private Action<Task<HttpResponseMessage>> LogSuccess(string modelName)
        {
            return delegate
            {
                _logger.Log(LogLevel.Information, $"{modelName} was/were added");
            };
        }
    }
}