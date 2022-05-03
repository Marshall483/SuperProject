using JiraScrapper.Models;

namespace JiraScrapper.MocksGenerator.Abstractions;

public interface ISprintMocker
{
    public IEnumerable<Sprint> ForProject(Project project, int count);
}