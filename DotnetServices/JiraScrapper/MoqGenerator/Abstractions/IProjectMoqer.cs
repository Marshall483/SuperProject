using JiraScrapper.Models;

namespace JiraScrapper.MocksGenerator.Abstractions;

public interface IProjectMoqer
{
    public Project NewProjectForUserId(Guid UserId);
}