using Microsoft.AspNetCore.Mvc.ModelBinding;
public class ApiValidationErrorResponse : ApiResponse<object>
{
    public ApiValidationErrorResponse(ModelStateDictionary modelState)
    {
        Success = false;
        Message = "Validation failed";
        Errors = modelState.Values
            .SelectMany(v => v.Errors)
            .Select(e => e.ErrorMessage)
            .ToList();
    }
}