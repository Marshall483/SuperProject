using System.Text.Json;
using Newtonsoft.Json;

namespace JiraScrapper.Models;

public class Project
{
    [JsonProperty("project_id")]
    public Guid ProjectId { get; set; }
    
    [JsonProperty("user_id")]
    public Guid UserId { get; set; }
    
    [JsonProperty("project_name")]
    public string ProjectName { get; set; }
    
    [JsonProperty("is_tracked")]
    public bool IsTracked { get; set; }
}