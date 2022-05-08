using Cassandra.NET.Attributes;
using Newtonsoft.Json;

namespace DataAccessService.Models;

/*CREATE TABLE jira.task(
    task_id uuid,
    sprint_id uuid,
    task_name text,
    status text,
    estimated_due_time_in_hours decimal,
    total_spent_time_in_hours decimal,
    PRIMARY KEY ( (sprint_id), task_id )
);*/

[CassandraTable("task")]
public class Issue
{
    [CassandraProperty("sprint_id")]
    [JsonProperty("SprintId")]
    public Guid SprintId { get; set; }
    
    [CassandraProperty("task_id")]
    [JsonProperty("IssueId")]
    public Guid IssueId { get; set; }
    
    [CassandraProperty("task_name")]
    [JsonProperty("IssueName")]
    public string IssueName { get; set; }
    
    [CassandraProperty("project_name")]
    [JsonProperty("ProjectName")]
    public string ProjectName { get; set; }
    
    [CassandraProperty("status")]
    [JsonProperty("Status")]
    public string Status { get; set; }
    
    [CassandraProperty("estimated_due_time_in_hours")]
    [JsonProperty("EstimatedDueTimeInHours")]
    public decimal EstimatedDueTimeInHours { get; set; }
    
    [CassandraProperty("total_spent_time_in_hours")]
    [JsonProperty("TotalSpentTimeInHours")]
    public decimal TotalSpentTimeInHours { get; set; }
}