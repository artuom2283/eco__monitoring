using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using server.Exceptions;

namespace server.Handlers;

public class AlreadyExistsExceptionHandler: IExceptionHandler
{
    private readonly ILogger<AlreadyExistsExceptionHandler> _logger;

    public AlreadyExistsExceptionHandler(ILogger<AlreadyExistsExceptionHandler> logger)
    {
        _logger = logger;
    }

    public async ValueTask<bool> TryHandleAsync(
        HttpContext httpContext,
        Exception exception,
        CancellationToken cancellationToken)
    {
        if (exception is not EntityAlreadyExistsException alreadyExistsException)
        {
            return false;
        }

        _logger.LogError(
            alreadyExistsException,
            "Exception occurred: {Message}",
            alreadyExistsException.Message);

        var problemDetails = new ProblemDetails
        {
            Status = StatusCodes.Status409Conflict,
            Title = "Entity already exists",
            Detail = alreadyExistsException.Message
        };

        httpContext.Response.StatusCode = problemDetails.Status.Value;

        await httpContext.Response
            .WriteAsJsonAsync(problemDetails, cancellationToken);

        return true;
    }
}