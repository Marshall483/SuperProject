using Newtonsoft.Json;

namespace JiraScrapper.Models;

public class Sprint
{
    [JsonProperty("project_id")]
    public Guid ProjectId { get; set; }
    
    [JsonProperty("sprint_id")]
    public Guid SprintId { get; set; }

    [JsonProperty("sprint_name")]
    public string SprintName { get; set; }
}