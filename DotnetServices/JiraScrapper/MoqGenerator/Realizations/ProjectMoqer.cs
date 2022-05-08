using JiraScrapper.MocksGenerator.Abstractions;
using JiraScrapper.Models;

namespace JiraScrapper.MocksGenerator.Realizations;

public class ProjectMoqer : IProjectMoqer
{
    public List<Project> NewProjectForUserId(Guid UserId)
    {
        var projects = new List<Project>();
        
        projects.Add(
            new Project
            {
                UserId = UserId,
                IsTracked = false,
                ProjectId = Guid.NewGuid(),
                ProjectName = $"Project {Random.Shared.Next()}"
            });

        return projects;
    }
}