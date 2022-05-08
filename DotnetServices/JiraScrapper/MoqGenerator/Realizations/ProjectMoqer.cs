using JiraScrapper.MocksGenerator.Abstractions;
using JiraScrapper.Models;

namespace JiraScrapper.MocksGenerator.Realizations;

public class ProjectMoqer : IProjectMoqer
{
    public Project NewProjectForUserId(Guid UserId)
    {
        return new Project()
        {
            UserId = UserId,
            IsTracked = false,
            ProjectId = Guid.NewGuid(),
            ProjectName = $"Project {Random.Shared.Next()}"
        };
    }
}