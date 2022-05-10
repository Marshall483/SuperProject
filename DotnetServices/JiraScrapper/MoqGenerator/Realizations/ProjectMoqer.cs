using JiraScrapper.MocksGenerator.Abstractions;
using JiraScrapper.Models;

namespace JiraScrapper.MocksGenerator.Realizations;

public class ProjectMoqer : IProjectMoqer
{
    public List<Project> NewProjectForUserId(Guid UserId, int count)
    {
        var projects = new List<Project>();
        
        for (int i = 0; i < count; i++)
        {
            projects.Add(new Project
            {
                UserId = UserId,
                IsTracked = false,
                ProjectId = Guid.NewGuid(),
                ProjectName = $"Project {Random.Shared.Next()}"
            });
        }

        return projects;
    }
}