using CitizenFX.Core;
using CitizenFX.Core.Native;
using System;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

public class Main : BaseScript
{
    private readonly HttpClient client = new HttpClient();
    private readonly string BASE_ADDR = API.GetConvar("api_connection_string", "http://127.0.0.1:8080/api/");
    public Main()
    {
        Debug.WriteLine("^5API Server Started^7");
        EventHandlers["db:get"] += new Action<string, CallbackDelegate>(Get);
        EventHandlers["db:post"] += new Action<string, string, CallbackDelegate>(Post);

        Exports.Add("get", new Func<string, Object[]>(GetSync));
        Exports.Add("post", new Func<string, string, Object[]>(PostSync));
        Exports.Add("put", new Func<string, string, Object[]>(PutSync));
    }

    public void Get(string url, CallbackDelegate cb)
    {
        client.GetAsync(BASE_ADDR + url).ContinueWith(getTask =>
        {
            if (getTask.Status == TaskStatus.RanToCompletion)
            {
                var msg = getTask.Result;

                msg.Content.ReadAsStringAsync().ContinueWith(readTask =>
                {
                    cb.Invoke(new string[] { ((int)msg.StatusCode).ToString(), readTask.Result });
                });
            }
            else if (getTask.Status == TaskStatus.Faulted)
            {
                getTask.Exception.Handle((ex) =>
                {
                    cb.Invoke(new string[] { "0", ex.InnerException.Message });
                    return true;
                });
            }
        });
    }

    public void Post(string url, string data, CallbackDelegate cb)
    {
        var content = new StringContent(data, Encoding.UTF8, "application/json");
        client.PostAsync(BASE_ADDR + url, content).ContinueWith(getTask =>
        {
            if (getTask.Status == TaskStatus.RanToCompletion)
            {
                var msg = getTask.Result;

                msg.Content.ReadAsStringAsync().ContinueWith(readTask =>
                {
                    cb.Invoke(new string[] { ((int)msg.StatusCode).ToString(), readTask.Result });
                });
            }
            else if (getTask.Status == TaskStatus.Faulted)
            {
                getTask.Exception.Handle((ex) =>
                {
                    cb.Invoke(new string[] { "-2", ex.InnerException.Message });
                    return true;
                });
            }
        });
    }

    public Object[] GetSync(string url)
    {
        var getTask = client.GetAsync(BASE_ADDR + url);
        getTask.Wait(1000);

        if (getTask.Status == TaskStatus.RanToCompletion)
        {
            var msg = getTask.Result;
            var readTask = msg.Content.ReadAsStringAsync();
            readTask.Wait(1000);

            return new Object[] { (int)msg.StatusCode, readTask.Result };
        }
        else if (getTask.Status == TaskStatus.WaitingForActivation)
        {
            return new Object[] { -1, "Connection error" };
        }
        else if (getTask.Status == TaskStatus.Faulted)
        {
            foreach (var ex in getTask.Exception.InnerExceptions) {
                return new Object[] { -2, ex.Message };
            };
        }

        return new object[] { 0, "Unknown status" };
    }

    public Object[] PostSync(string url, string data)
    {
        var content = new StringContent(data, Encoding.UTF8, "application/json");
        var getTask = client.PostAsync(BASE_ADDR + url, content);
        getTask.Wait(1000);

        if (getTask.Status == TaskStatus.RanToCompletion)
        {
            var msg = getTask.Result;

            var readTask = msg.Content.ReadAsStringAsync();
            readTask.Wait(1000);

            return new Object[] { (int)msg.StatusCode, readTask.Result };
        }
        else if (getTask.Status == TaskStatus.WaitingForActivation)
        {
            return new Object[] { -1, "Connection error" };
        }
        else if (getTask.Status == TaskStatus.Faulted)
        {
            foreach (var ex in getTask.Exception.InnerExceptions)
            {
                return new Object[] { -2, ex.Message };
            };
        }

        return new object[] { 0, "Unknown status" };
    }

    public Object[] PutSync(string url, string data)
    {
        var content = new StringContent(data, Encoding.UTF8, "application/json");
        var getTask = client.PutAsync(BASE_ADDR + url, content);
        getTask.Wait(1000);

        if (getTask.Status == TaskStatus.RanToCompletion)
        {
            var msg = getTask.Result;

            var readTask = msg.Content.ReadAsStringAsync();
            readTask.Wait(1000);

            return new Object[] { (int)msg.StatusCode, readTask.Result };
        }
        else if (getTask.Status == TaskStatus.WaitingForActivation)
        {
            return new Object[] { -1, "Connection error" };
        }
        else if (getTask.Status == TaskStatus.Faulted)
        {
            foreach (var ex in getTask.Exception.InnerExceptions)
            {
                return new Object[] { -2, ex.Message };
            };
        }

        return new object[] { 0, "Unknown status" };
    }

    public Object[] DeleteSync(string url)
    {
        var getTask = client.DeleteAsync(BASE_ADDR + url);
        getTask.Wait(1000);

        if (getTask.Status == TaskStatus.RanToCompletion)
        {
            var msg = getTask.Result;

            var readTask = msg.Content.ReadAsStringAsync();
            readTask.Wait(1000);

            return new Object[] { (int)msg.StatusCode, readTask.Result };
        }
        else if (getTask.Status == TaskStatus.WaitingForActivation)
        {
            return new Object[] { -1, "Connection error" };
        }
        else if (getTask.Status == TaskStatus.Faulted)
        {
            foreach (var ex in getTask.Exception.InnerExceptions)
            {
                return new Object[] { -2, ex.Message };
            };
        }

        return new object[] { 0, "Unknown status" };
    }

}
