using FluentValidation;
using server.DTOs;

namespace server.Validators;

public class UpdateReportValidator : AbstractValidator<UpdateReportDto>
{
    public UpdateReportValidator()
    {
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
            .Length(5, 50);
        
        RuleFor(p => p.TaxAmount)
            .NotEmpty()
            .GreaterThan(0);
    }
}