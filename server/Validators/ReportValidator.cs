using FluentValidation;
using server.DTOs;

namespace server.Validators;

public class ReportValidator : AbstractValidator<ReportDto>
{
    public ReportValidator()
    {
        RuleFor(p => p.FacilityName)
            .NotEmpty()
            .MaximumLength(100);
        
        RuleFor(p => p.PollutionName)
            .NotEmpty()
            .MaximumLength(100);
        
        RuleFor(p => p.Year)
            .NotEmpty()
            .GreaterThan(0);
        
        RuleFor(p => p.Volume)
            .NotEmpty()
            .GreaterThan(0);
    }
}