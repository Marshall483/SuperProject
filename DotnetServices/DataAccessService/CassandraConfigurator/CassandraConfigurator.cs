using Cassandra;
using ISession = Cassandra.ISession;

namespace DataAccessService.CassandraConfigurator;

public static class CassandraConfigurator
{
    public static ISession Configure()
    {
        Cluster cluster = Cluster.Builder().AddContactPoint("127.0.0.1").WithPort(9042)
            .WithCredentials("cassandra", "cassandra").Build();
        
        return cluster.Connect("jira");
    }
}