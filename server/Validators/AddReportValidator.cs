using FluentValidation;
using server.DTOs;

namespace server.Validators;

public class AddReportValidator : AbstractValidator<AddReportDto>
{
    public AddReportValidator()
    {
        RuleFor(x => x.IndustrialFacilityId)
            .NotEmpty()
            .GreaterThan(0);
        
        RuleFor(x => x.PollutionId)
            .NotEmpty()
            .GreaterThan(0);
        
        RuleFor(p => p.Year)
            .NotEmpty()
            .GreaterThan(0);
        
        RuleFor(p => p.Volume)
            .NotEmpty()
            .GreaterThan(0);

        RuleFor(p => p.TaxRate)
            .NotEmpty()
            .GreaterThan(0);

        RuleFor(p => p.TaxType)
            .NotEmpty()
            .Length(5, 255);
        
        RuleFor(p => p.TaxAmount)
            .NotEmpty()
            .GreaterThan(0);
    }
}