using Newtonsoft.Json;

namespace DataAccessService.Models.ReportModels;

public class Cheese
{
    [JsonProperty("ClosedTasksAmount")]
    public int ClosedTasksAmount { get; set; }
    
    [JsonProperty("InProgressTasksAmount")]
    public int InProgressTasksAmount { get; set; }
    
    [JsonProperty("AnalysisTasksAmount")]
    public int AnalysisTasksAmount { get; set; }

}