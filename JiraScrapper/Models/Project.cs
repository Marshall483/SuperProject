using Newtonsoft.Json;

namespace JiraScrapper.Models
{
    public class Project
    {
        [JsonProperty("name")]
        public string Name { get; set; }
        
        [JsonProperty("creator_name")]
        public string CreatorName { get; set; }
    }
}