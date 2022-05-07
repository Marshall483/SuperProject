using JiraScrapper.Models;

namespace JiraScrapper.MocksGenerator.Abstractions;

public interface IProjectMocker
{
    public Project NewProjectForUserId(Guid UserId);
}