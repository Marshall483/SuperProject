using Cassandra.Data.Linq;
using CqlPoco;

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

[TableName("task")]
public class Issue
{
    [PartitionKey]
    [CqlPoco.Column("sprint_id")]
    public Guid SprintId { get; set; }
    
    [CqlPoco.Column("task_id")]
    public Guid IssueId { get; set; }
    
    [CqlPoco.Column("task_name")]
    public string IssueName { get; set; }
    
    [CqlPoco.Column("status")]
    public string Status { get; set; }
    
    [CqlPoco.Column("estimated_due_time_in_hours")]
    public decimal EstimatedDueTimeInHours { get; set; }
    
    [CqlPoco.Column("total_spent_time_in_hours")]
    public decimal TotalSpentTimeInHours { get; set; }
}