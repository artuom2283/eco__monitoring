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
    }
}