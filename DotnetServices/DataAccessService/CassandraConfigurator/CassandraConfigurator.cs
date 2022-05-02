using Cassandra;
using ISession = Cassandra.ISession;

namespace DataAccessService.CassandraConfigurator;

public static class CassandraConfigurator
{
    public static ISession Configure()
    {
        var cluster = Cluster.Builder()
            .AddContactPoint("0.0.0.0").WithPort(9042).Build();
           /* .WithRetryPolicy(new LoggingRetryPolicy(new DefaultRetryPolicy()))
            .WithReconnectionPolicy(new ConstantReconnectionPolicy(1000))
            .WithCredentials("cassandra", "cassandra");*/

      /*  cluster.PoolingOptions.SetCoreConnectionsPerHost(HostDistance.Local, 1);
        cluster.SocketOptions.SetKeepAlive(true);*/

        return cluster.Connect("jira");
    }
}