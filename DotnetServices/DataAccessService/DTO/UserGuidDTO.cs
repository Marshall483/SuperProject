using Newtonsoft.Json;

namespace DataAccessService.DTO;

public class UserGuidDTO
{
    [JsonProperty("UserGuid")]
    public string UserGuid { get; set; }
}