namespace server.Exceptions;

public class IncorrectParamsException: Exception
{
    public IncorrectParamsException(string message) : base(message)
    {
    }
    
    public IncorrectParamsException() : base("Request is missing one or more parameters (or parameter(s) is/are incorrect)")
    {
    }
}