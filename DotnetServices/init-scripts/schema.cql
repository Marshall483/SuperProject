CREATE KEYSPACE IF NOT EXISTS jira
    WITH REPLICATION = {
        'class' : 'NetworkTopologyStrategy',
        'datacenter1' : 3
        };

CREATE TABLE IF NOT EXISTS jira.project(
    project_id uuid,
    user_id uuid,
    project_name text,
    is_tracked boolean,
    PRIMARY KEY ( (user_id), project_id )
);

CREATE TABLE IF NOT EXISTS jira.sprint(
    sprint_id uuid,
    project_id uuid,
    sprint_name text,
    PRIMARY KEY ( (project_id), sprint_id )
);

CREATE TABLE IF NOT EXISTS jira.task(
    task_id uuid,
    sprint_id uuid,
    project_name text,
    task_name text,
    status text,
    estimated_due_time_in_hours decimal,
    total_spent_time_in_hours decimal,
    PRIMARY KEY ( (sprint_id), task_id )
);