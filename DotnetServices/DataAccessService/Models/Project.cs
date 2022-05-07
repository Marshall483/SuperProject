using Cassandra.Data.Linq;
using Cassandra.NET.Attributes;
using Newtonsoft.Json;

namespace DataAccessService.Models;

/*CREATE TABLE jira.project(
    project_id uuid,
    user_id uuid,
    project_name text,
    is_tracked boolean,
    PRIMARY KEY ( (user_id), project_id )
);*/

[CassandraTable("project")]
public class Project
{
    [CassandraProperty("project_id")]
    [JsonProperty("project_id")]
    public Guid ProjectId { get; set; }
    
    [PartitionKey]
    [CassandraProperty("user_id")]
    [JsonProperty("user_id")]
    public Guid UserId { get; set; }
    
    [CassandraProperty("project_name")]
    [JsonProperty("project_name")]
    public string ProjectName { get; set; }

    [CassandraProperty("is_tracked")]
    [JsonProperty("is_tracked")]
    public bool IsTracked { get; set; }
}