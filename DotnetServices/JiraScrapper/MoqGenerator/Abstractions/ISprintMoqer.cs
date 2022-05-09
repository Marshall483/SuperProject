using JiraScrapper.Models;

namespace JiraScrapper.MocksGenerator.Abstractions;

public interface ISprintMoqer
{
    public IEnumerable<Sprint> ForProject(IEnumerable<Project> projects, int count);
}