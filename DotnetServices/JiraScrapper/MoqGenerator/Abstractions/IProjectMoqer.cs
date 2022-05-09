using JiraScrapper.Models;

namespace JiraScrapper.MocksGenerator.Abstractions;

public interface IProjectMoqer
{
    public IEnumerable<Project> NewProjectForUserId(Guid UserId, int count);
}