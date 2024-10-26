namespace server.Validators;

public class SortValidator
{
    public void ValidateParams(string param, string orderBy)
    {
        var validParams = new List<string> { "reports.year", "reports.volume", "pollutions.mass_flow_rate", "pollutions.emissions_limit", "reports.tax_rate", "reports.tax_amount", "tax_sum_amount.total_tax_amount" };
        var validOrder = new List<string> { "ASC", "DESC" };
        
        if (!validParams.Contains(param.ToLower()) || !validOrder.Contains(orderBy.ToUpper()))
        {
            throw new ArgumentException("Invalid parameters");
        }
    }
}