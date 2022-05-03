using Newtonsoft.Json;

namespace DataAccessService.DTO;

public class UserGuidDTO
{
    [JsonProperty("user_guid")]
    public string UserGuid { get; set; }
}