using JiraScrapper.MocksGenerator.Abstractions;
using JiraScrapper.Models;

namespace JiraScrapper.MocksGenerator.Realizations;

public class IssueMoqer : IIssueMoqer
{
    public IEnumerable<Issue> ForSprints(IEnumerable<Sprint> sprints, IEnumerable<string> projectNames, int countPerSprint)
    {
        if (sprints.ToArray().Length == 0 || countPerSprint == 0)
            throw new ArgumentException("(sprints.ToArray().Length == 0 || countPerSprint == 0) was true");

        var issues = new List<Issue>();
        var namesOfProjects = projectNames.ToList();

        var statuses = new[] { "in_progress", "closed", "analysis" };
        
        var projectNameIndex = 0;
        var currentSprintIndex = 0;
        
        foreach (var sprint in sprints)
        {
            currentSprintIndex++;

            if (currentSprintIndex == countPerSprint)
            {
                currentSprintIndex = 0;
                projectNameIndex++;
            }

            for (int i = 0; i < countPerSprint; i++)
            {
                issues.Add(new Issue
                {
                    SprintId = sprint.SprintId,
                    Status = statuses[Random.Shared.Next(0, 3)],
                    IssueId = Guid.NewGuid(),
                    IssueName = $"Issue {Random.Shared.Next()}",
                    ProjectName = namesOfProjects[projectNameIndex],
                    EstimatedDueTimeInHours = Random.Shared.Next(2, 8),
                    TotalSpentTimeInHours = Random.Shared.Next(2, 8),
                });
            }
        }

        return issues;
    }
}