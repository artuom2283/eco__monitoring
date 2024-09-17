﻿namespace server.Exceptions;

public class EntityAlreadyExistsException : Exception
{
    public EntityAlreadyExistsException(string message) : base(message)
    {
    }
    
    public EntityAlreadyExistsException() : base("Entity already exist")
    {
    }
}