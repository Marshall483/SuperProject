﻿using Cassandra.Data.Linq;
using CqlPoco;
using Newtonsoft.Json;

namespace DataAccessService.Models;

/*CREATE TABLE jira.project(
    project_id uuid,
    user_id uuid,
    project_name text,
    is_tracked boolean,
    PRIMARY KEY ( (user_id), project_id )
);*/

[TableName("project")]
public class Project
{
    [CqlPoco.Column("project_id")]
    [JsonProperty("project_id")]
    public Guid ProjectId { get; set; }
    
    [PartitionKey]
    [CqlPoco.Column("user_id")]
    [JsonProperty("user_id")]
    public Guid UserId { get; set; }
    
    [CqlPoco.Column("project_name")]
    [JsonProperty("project_name")]
    public string ProjectName { get; set; }

    [CqlPoco.Column("is_tracked")]
    [JsonProperty("is_tracked")]
    public bool IsTracked { get; set; }
}