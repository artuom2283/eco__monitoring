using FluentValidation;

namespace server.Validators;

public class IndustrialFacilityValidator : AbstractValidator<IndustrialFacilityDto>
{
    public IndustrialFacilityValidator()
    {
        RuleFor(p => p.Name)
            .NotEmpty()
            .MinimumLength(3)
            .MaximumLength(50);
    }
}