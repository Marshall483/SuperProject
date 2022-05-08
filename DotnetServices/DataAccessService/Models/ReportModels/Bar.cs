using Newtonsoft.Json;

namespace DataAccessService.Models.ReportModels;

public class Bar
{
    [JsonProperty("EstimatedDueTimeInHours")]
    public decimal EstimatedDueTimeInHours { get; set; }
    
    [JsonProperty("TotalSpentTimeInHours")]
    public decimal TotalSpentTimeInHours { get; set; }
}