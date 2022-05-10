using System.Diagnostics;
using System.Net.Http.Headers;
using System.Text;
using JiraScrapper.JsonSender.Abstractions;
using Newtonsoft.Json;

namespace JiraScrapper.JsonSender.Realizations;

public class JsonSender : IJsonSender
{
    public async Task SendPost(string url, int port, string endpointPath, string json, Action<Task<HttpResponseMessage>> continuation)
    {
        using (var client = new HttpClient())
        {
            var address = $"http://{url}:{port}{endpointPath}";

            client.BaseAddress = new Uri(address);
            client.DefaultRequestHeaders
                .Accept
                .Add(new MediaTypeWithQualityHeaderValue("application/json")); //ACCEPT header

            var request = new HttpRequestMessage(HttpMethod.Post, address);

            request.Content = new StringContent(json,
                Encoding.UTF8,
                "application/json");

            await client.SendAsync(request)
                .ContinueWith(continuation);
        }
    }
}