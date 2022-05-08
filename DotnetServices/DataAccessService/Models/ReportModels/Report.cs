using Newtonsoft.Json;

namespace DataAccessService.Models.ReportModels;

public class Report
{
    [JsonProperty("Cheese")]
    public Cheese Cheese { get; set; }
    
    [JsonProperty("Bars")]
    public List<Bar> Bars { get; set; }
}