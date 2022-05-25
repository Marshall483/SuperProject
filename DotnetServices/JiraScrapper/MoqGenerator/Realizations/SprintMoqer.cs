using JiraScrapper.MocksGenerator.Abstractions;
using JiraScrapper.Models;

namespace JiraScrapper.MocksGenerator.Realizations;

public class SprintMoqer : ISprintMoqer
{
    public List<Sprint> ForProject(List<Project> projects, int count)
    {
        var sprints = new List<Sprint>();
        
        foreach (var project in projects)
        {
            for(int i = 0; i < count; i++)
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