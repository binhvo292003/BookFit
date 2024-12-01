using System.Text.Json;
using Microsoft.AspNetCore.Mvc;

namespace API.Middleware
{

  public class ExceptionnMiddeleWare
  {
    private readonly RequestDelegate _next;
    private readonly ILogger<ExceptionnMiddeleWare> _logger;
    private readonly IHostEnvironment _env;
    public ExceptionnMiddeleWare(RequestDelegate next, ILogger<ExceptionnMiddeleWare> logger, IHostEnvironment env)
    {
      _env = env;
      _logger = logger;
      _next = next;
    }

    public async Task InvokeAsync(HttpContext context)
    {
      try
      {
        await _next(context);
      }
      catch (Exception ex)
      {
        _logger.LogError(ex, ex.Message);
        context.Response.ContentType = "application/json";
        context.Response.StatusCode = 500;

        var respone = new ProblemDetails
        {
          Status = 500,
          Detail = _env.IsDevelopment() ? ex.StackTrace?.ToString() : null
        };

        var options = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };

        var json = JsonSerializer.Serialize(respone, options);

        await context.Response.WriteAsync(json);
      }
    }

  }

}