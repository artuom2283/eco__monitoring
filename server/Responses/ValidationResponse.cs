using FluentValidation.Results;

namespace server.Responses;

public class ValidationResponse
{
    public int StatusCode { get; set; }

    public string Message { get; set; } =
        "Request is missing one or more parameters (or parameter(s) is/are incorrect)";
    public List<ValidationFailure> Errors { get; set; }
}