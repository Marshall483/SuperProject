namespace DataAccessService.Models;

public class Project
{
    public Guid ProjectId { get; set; }
    public Guid UserId { get; set; }
    
    public string ProjectName { get; set; }
}