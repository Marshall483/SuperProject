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
    public class MockController : ControllerBase
    {
        private readonly ILogger<MockController> _logger;
        private readonly IProjectMocker _project;
        private readonly ISprintMocker _sprint;
        private readonly IIssueMocker _issue;

        private readonly IJsonSender _sender;

        public MockController(ILogger<MockController> logger, IProjectMocker project, 
            ISprintMocker sprint, IIssueMocker issue, IJsonSender sender)
        {
            _logger = logger;
            _project = project;
            _sprint = sprint;
            _issue = issue;
            _sender = sender;
        }
        
        [HttpPost(Name = "ForNewUser")]
        public async Task<IActionResult> ForNewUser(string userGuidDto)
        {
            UserGuidDTO? userGuidDtoModel;

            try
            {
                userGuidDtoModel = JsonConvert.DeserializeObject<UserGuidDTO>(userGuidDto);
            }
            catch (Exception e)
            {
                _logger.Log(LogLevel.Information, "Mocks for invalid user`s guid were requested");
                return BadRequest();
            }

            var userGuid = Guid.Parse(userGuidDtoModel.UserGuid);
            
            var project = _project.NewProjectForUserId(userGuid);
            var sprints = _sprint.ForProject(project, Random.Shared.Next(1,3));
            var issues = _issue.ForSprints(sprints, Random.Shared.Next(1, 3));
            
            var jsonProject = JsonConvert.SerializeObject(project, Formatting.Indented);
            var jsonSprint = JsonConvert.SerializeObject(sprints, Formatting.Indented);
            var jsonIssue = JsonConvert.SerializeObject(issues, Formatting.Indented);

            var localhost = "127.0.0.1";
            var dataAccessServicePort = 8083;
            
            var tasks = new List<Task>
            {
                _sender.SendPost(localhost, dataAccessServicePort, "/api/Projects/AddProject", jsonProject,
                    LogSuccess(nameof(Project))),
                _sender.SendPost(localhost, dataAccessServicePort,  "/api/Sprint/AddSprint", jsonSprint,
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