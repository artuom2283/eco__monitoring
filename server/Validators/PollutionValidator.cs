using System.Data;
using FluentValidation;
using server.DTO;

namespace server.Validators;

public class PollutionValidator : AbstractValidator<PollutionDto>
{
    public PollutionValidator()
    {
        RuleFor(p => p.Name)
            .NotEmpty()
            .MinimumLength(3)
            .MaximumLength(50);

        RuleFor(p => p.Volume)
            .NotEmpty()
            .GreaterThan(0);
        
        RuleFor(p => p.Tax)
            .NotEmpty()
            .GreaterThan(0);
        
        RuleFor(p => p.MassFlowRate)
            .NotEmpty()
            .GreaterThan(0);
        
        RuleFor(p => p.EmissionsLimit)
            .NotEmpty()
            .GreaterThan(0);
        
        RuleFor(p => p.IndustrialFacilityId)
            .NotEmpty()
            .GreaterThan(0);
    }
}