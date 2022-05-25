using JiraScrapper.Models;

namespace JiraScrapper.MocksGenerator.Abstractions;

public interface IIssueMoqer
{
    public List<Issue> ForSprints(List<Sprint> sprints, List<string> projectNames, int countPerSprint);
}