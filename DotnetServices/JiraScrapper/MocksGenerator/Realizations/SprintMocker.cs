using JiraScrapper.MocksGenerator.Abstractions;
using JiraScrapper.Models;

namespace JiraScrapper.MocksGenerator.Realizations;

public class SprintMocker : ISprintMocker
{
    public IEnumerable<Sprint> ForProject(Project project, int count)
    {
        if (project.ProjectId == Guid.Empty || count == 0)
            throw new ArgumentException("(project.ProjectId == Guid.Empty || count == 0) was true");

        var sprints = new List<Sprint>();
        
        for (int i = 0; i < count; i++)
        {
            sprints.Add(new Sprint
            {
                ProjectId = project.ProjectId,
                SprintId = Guid.NewGuid(),
                SprintName = $"Sprint {Random.Shared.Next()}"
            });
        }

        return sprints;
    }
}