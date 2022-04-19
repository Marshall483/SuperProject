using System.Linq;
using System.Threading.Tasks;
using Atlassian.Jira;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace JiraScrapper.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class JiraController : ControllerBase
    {
        [HttpGet(Name = "GetProjects")]
        public async Task<string> GetProjects(string jUserID, string jPassword)
        {
            jUserID = "azat.nabiev991@gmail.com";
            jPassword = "XTGFrW2gEttkQ3qrOxgF96DA";
            
            var jiraConn = Jira.CreateRestClient("https://teamplays.atlassian.net/", jUserID, jPassword);
            var projects = await jiraConn.Projects.GetProjectsAsync();

            return JsonConvert.SerializeObject(projects, Formatting.Indented);
        }
        
        [HttpGet(Name = "GetIssues")]
        public async Task<string> GetIssues(string jUserID, string jPassword)
        {
            jUserID = "azat.nabiev991@gmail.com";
            jPassword = "XTGFrW2gEttkQ3qrOxgF96DA";
            
            var jiraConn = Jira.CreateRestClient("https://teamplays.atlassian.net/", jUserID, jPassword);
            var issues = jiraConn.Issues.Queryable.Select(x => x);

            return JsonConvert.SerializeObject(issues, Formatting.Indented);
        }
    }
}