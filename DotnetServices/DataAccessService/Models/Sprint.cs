using Cassandra.Data.Linq;
using CqlPoco;
using Newtonsoft.Json;

namespace DataAccessService.Models;

/*CREATE TABLE jira.sprint(
    sprint_id uuid,
    project_id uuid,
    sprint_name text,
    PRIMARY KEY ( (project_id), sprint_id )
);*/

[TableName("sprint")]
public class Sprint
{
    [PartitionKey]
    [CqlPoco.Column("project_id")]
    [JsonProperty("project_id")]
    public Guid ProjectId { get; set; }
    
    [CqlPoco.Column("sprint_id")]
    [JsonProperty("sprint_id")]
    public Guid SprintId { get; set; }
    
    [CqlPoco.Column("sprint_name")]
    [JsonProperty("sprint_name")]
    public string SprintName { get; set; }
}