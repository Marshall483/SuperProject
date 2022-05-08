using Newtonsoft.Json;

namespace JiraScrapper.Models;

/*CREATE TABLE jira.task(
    task_id uuid,
    sprint_id uuid,
    task_name text,
    status text,
    estimated_due_time_in_hours decimal,
    total_spent_time_in_hours decimal,
    PRIMARY KEY ( (sprint_id), task_id )
);*/

public class Issue
{
    [JsonProperty("SprintId")]
    public Guid SprintId { get; set; }
    
    [JsonProperty("IssueId")]
    public Guid IssueId { get; set; }
    
    [JsonProperty("IssueName")]
    public string IssueName { get; set; }
    
    [JsonProperty("ProjectName")]
    public string ProjectName { get; set; }
    
    [JsonProperty("Status")]
    public string Status { get; set; }
    
    [JsonProperty("EstimatedDueTimeInHours")]
    public decimal EstimatedDueTimeInHours { get; set; }
    
    [JsonProperty("TotalSpentTimeInHours")]
    public decimal TotalSpentTimeInHours { get; set; }
}