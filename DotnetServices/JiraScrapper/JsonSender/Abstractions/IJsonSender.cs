namespace JiraScrapper.JsonSender.Abstractions;

public interface IJsonSender
{
    public Task SendPost(string url, int port, string endpointPath, string json,  Action<Task<HttpResponseMessage>> continuationAction);
}