using Newtonsoft.Json;

namespace JiraScrapper.DTO;

public class UserGuidDTO
{
    [JsonProperty("user_guid")]
    public string UserGuid { get; set; }
}