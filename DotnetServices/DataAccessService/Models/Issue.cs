namespace DataAccessService.Models;

public class Issue
{
    public Guid IssueId { get; set; }
    public Guid SprintId { get; set; }
    
    public string IssueName { get; set; }
    public string Status { get; set; }
    
    public decimal EstimatedDueTimeInHours { get; set; }
    public decimal TotalSpentTimeInHours { get; set; }
}