using FluentValidation;
using server.DTOs;

namespace server.Validators;

public class RiskValidator : AbstractValidator<RiskDto>
{
    public RiskValidator()
    {
        RuleFor(p => p.CalculationType)
            .NotEmpty()
            .WithMessage("Calculation Type is required");
        
        RuleFor(p => p.Result)
            .NotEmpty()
            .GreaterThan(0)
            .WithMessage("Result is invalid");

        RuleFor(p => p.CalculationType)
            .NotEmpty()
            .WithMessage("Calculation Type is required");
    }
}