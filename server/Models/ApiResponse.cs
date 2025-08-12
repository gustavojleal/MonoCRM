public class ApiResponse<T>
{
    public bool Success { get; set; }
    public string Message { get; set; } = string.Empty;
    public T? Data { get; set; }
    public IEnumerable<string> Errors { get; set; } = Enumerable.Empty<string>();
    public IEnumerable<string> NextSteps { get; set; } = Enumerable.Empty<string>();
    public string Suggestion { get; set; } = string.Empty;
    public string Error { get; set; } = string.Empty;
}