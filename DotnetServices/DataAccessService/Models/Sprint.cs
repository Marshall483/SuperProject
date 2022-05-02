namespace DataAccessService.Models;

public class Sprint
{
    public Guid ProjectId { get; set; }
    public Guid SprintId { get; set; }
    
    public string SprintName { get; set; }
}