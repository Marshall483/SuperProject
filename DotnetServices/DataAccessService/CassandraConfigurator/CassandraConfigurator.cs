using Cassandra;
using ISession = Cassandra.ISession;

namespace DataAccessService.CassandraConfigurator;

public static class CassandraConfigurator
{
    public static ISession Configure()
    {
        var cluster = Cluster.Builder()
            .AddContactPoints("127.0.0.1", "0.0.0.1", "0.0.0.0").WithPort(9042)
            .WithRetryPolicy(new LoggingRetryPolicy(new DefaultRetryPolicy()))
            .WithReconnectionPolicy(new ConstantReconnectionPolicy(1000))
            .WithCredentials("cassandra", "cassandra");

        cluster.PoolingOptions.SetCoreConnectionsPerHost(HostDistance.Local, 1);
        cluster.SocketOptions.SetKeepAlive(true);

        return cluster.Build().Connect("jira");
    }
}