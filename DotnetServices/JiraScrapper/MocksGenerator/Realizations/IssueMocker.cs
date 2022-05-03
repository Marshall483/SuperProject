using JiraScrapper.MocksGenerator.Abstractions;
using JiraScrapper.Models;

namespace JiraScrapper.MocksGenerator.Realizations;

public class IssueMocker : IIssueMocker
{
    public IEnumerable<Issue> ForSprints(IEnumerable<Sprint> sprints, int countPerSprint)
    {
        if (sprints.ToArray().Length == 0 || countPerSprint == 0)
            throw new ArgumentException("(sprints.ToArray().Length == 0 || countPerSprint == 0) was true");

        var issues = new List<Issue>();

        foreach (var sprint in sprints)
        {
            for (int i = 0; i < countPerSprint; i++)
            {
                issues.Add(new Issue
                {
                    SprintId = sprint.SprintId,
                    IssueId = Guid.NewGuid(),
                    IssueName = $"Issue {Random.Shared.Next()}",
                    EstimatedDueTimeInHours = Random.Shared.Next(2,8),
                    TotalSpentTimeInHours = Random.Shared.Next(2, 8),
                });
            }
        }

        return issues;
    }
}