using JiraScrapper.MocksGenerator.Abstractions;
using JiraScrapper.Models;

namespace JiraScrapper.MocksGenerator.Realizations;

public class ProjectMoqer : IProjectMoqer
{
    public IEnumerable<Project> NewProjectForUserId(Guid UserId, int count)
    {
        return Enumerable.Range(1, count).Select(project => new Project
        {
            UserId = UserId,
            IsTracked = false,
            ProjectId = Guid.NewGuid(),
            ProjectName = $"Project {Random.Shared.Next()}"
        });
    }
}