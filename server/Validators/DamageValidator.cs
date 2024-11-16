using FluentValidation;
using server.DTOs;

namespace server.Validators;

public class DamageValidator : AbstractValidator<DamageDto>
{
    public DamageValidator()
    {
        RuleFor(x => x.Result)
            .NotEmpty()
            .WithMessage("Damage result can't be empty");
        
        RuleFor(x => x.Type)
            .NotEmpty()
            .WithMessage("Damage type can't be empty");
        
        RuleFor(x => x.Year)
            .LessThan(DateTime.Now.Year)
            .WithMessage("Year can't be empty or greater than current date");
        
        RuleFor(x => x.IndustrialFacilityId)
            .NotEmpty()
            .WithMessage("Facility id can't be empty");
        
        RuleFor(x => x.PollutionId)
            .NotEmpty()
            .WithMessage("Pollution id can't be empty");
    }
}