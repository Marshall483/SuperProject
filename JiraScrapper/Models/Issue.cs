using System;
using Newtonsoft.Json;

namespace JiraScrapper.Models
{
    public class Issue
    {
        [JsonProperty("summary")]
        public string Summary { get; set; }
        
        [JsonProperty("project")]
        public string Project { get; set; }
        
        [JsonProperty("created_date")]
        public DateTime CreatedDate { get; set; }
        
        [JsonProperty("status")]
        public string Status { get; set; }
        
        [JsonProperty("relolution_date")]
        public DateTime RelolutionDate { get; set; }
    }
}