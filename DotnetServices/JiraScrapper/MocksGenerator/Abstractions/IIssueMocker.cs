using JiraScrapper.Models;

namespace JiraScrapper.MocksGenerator.Abstractions;

public interface IIssueMocker
{
    public IEnumerable<Issue> ForSprints(IEnumerable<Sprint> sprints, int countPerSprint);
}