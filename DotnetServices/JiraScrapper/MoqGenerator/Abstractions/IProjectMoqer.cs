using JiraScrapper.Models;

namespace JiraScrapper.MocksGenerator.Abstractions;

public interface IProjectMoqer
{
    public List<Project> NewProjectForUserId(Guid UserId, int count);
}