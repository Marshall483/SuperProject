using System.Text.Json;
using Newtonsoft.Json;

namespace JiraScrapper.Models;

public class Project
{
    [JsonProperty("ProjectId")]
    public Guid ProjectId { get; set; }
    
    [JsonProperty("UserId")]
    public Guid UserId { get; set; }
    
    [JsonProperty("ProjectName")]
    public string ProjectName { get; set; }
    
    [JsonProperty("IsTracked")]
    public bool IsTracked { get; set; }
}