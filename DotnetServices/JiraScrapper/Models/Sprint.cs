using Newtonsoft.Json;

namespace JiraScrapper.Models;

public class Sprint
{
    [JsonProperty("ProjectId")]
    public Guid ProjectId { get; set; }
    
    [JsonProperty("SprintId")]
    public Guid SprintId { get; set; }

    [JsonProperty("SprintName")]
    public string SprintName { get; set; }
}