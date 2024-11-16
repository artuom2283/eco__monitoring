using System.Data;
using FluentValidation;

namespace server.Validators;

public class PollutionValidator : AbstractValidator<PollutionDto>
{
    public PollutionValidator()
    {
        RuleFor(p => p.Name)
            .NotEmpty()
            .MinimumLength(3)
            .MaximumLength(50);
        
        RuleFor(p => p.DangerClass)
            .NotEmpty()
            .InclusiveBetween(0, 4);
        
        RuleFor(p => p.MassFlowRate)
            .NotEmpty()
            .GreaterThan(0);
        
        RuleFor(p => p.EmissionsLimit)
            .NotEmpty()
            .GreaterThan(0);
        
        RuleFor(p => p.SpecificEmissions)
            .NotEmpty()
            .GreaterThan(0);
        
        RuleFor(p => p.HazardCoefficient)
            .NotEmpty()
            .GreaterThan(0);
        
        RuleFor(p => p.HazardClassCoefficient)
            .NotEmpty()
            .GreaterThan(0);
        
    }
}