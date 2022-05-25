using JiraScrapper.Models;

namespace JiraScrapper.MocksGenerator.Abstractions;

public interface ISprintMoqer
{
    public List<Sprint> ForProject(List<Project> projects, int count);
}