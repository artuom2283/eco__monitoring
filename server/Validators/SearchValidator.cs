using FluentValidation;
    
namespace server.Validators;

public class SearchValidator : AbstractValidator<long>
{
    public SearchValidator()
    {
        RuleFor(p => p)
            .NotEmpty()
            .GreaterThan(0);
    }
}