using Newtonsoft.Json;

namespace JiraScrapper.Models;

public class Issue
{
    [JsonProperty("sprint_id")]
    public Guid SprintId { get; set; }
    
    [JsonProperty("issue_id")]
    public Guid IssueId { get; set; }
    
    [JsonProperty("issue_name")]
    public string IssueName { get; set; }

    [JsonProperty("status")]
    public string Status { get; set; }
    
    [JsonProperty("estimated_due_time_in_hours")]
    public decimal EstimatedDueTimeInHours { get; set; }
    
    [JsonProperty("total_spent_time_in_hours")]
    public decimal TotalSpentTimeInHours { get; set; }
}