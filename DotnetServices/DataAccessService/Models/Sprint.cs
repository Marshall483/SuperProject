using Cassandra.NET.Attributes;
using Newtonsoft.Json;

namespace DataAccessService.Models;

/*CREATE TABLE jira.sprint(
    sprint_id uuid,
    project_id uuid,
    sprint_name text,
    PRIMARY KEY ( (project_id), sprint_id )
);*/

[CassandraTable("sprint")]
public class Sprint
{
    [CassandraProperty("project_id")]
    [JsonProperty("project_id")]
    public Guid ProjectId { get; set; }
    
    [CassandraProperty("sprint_id")]
    [JsonProperty("sprint_id")]
    public Guid SprintId { get; set; }
    
    [CassandraProperty("sprint_name")]
    [JsonProperty("sprint_name")]
    public string SprintName { get; set; }
}