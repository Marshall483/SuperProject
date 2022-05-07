namespace DataAccessService.OperationResult;

public abstract class OperationResult<TResult, TError>
{
    public bool Success { get; set; }
    public virtual TResult Result { get; set; }
    public virtual TError Error { get; set; }
}

public sealed class SucceededOperationResult<TResult, TError> : OperationResult<TResult, TError>
{
    public override TError Error => throw new InvalidOperationException("Operation Succeeded");

    public SucceededOperationResult(TResult result)
    {
        Success = true;
        Result = result;
    }
}

public sealed class FailedOperationResult<TResult, TError> : OperationResult<TResult, TError>
{
    public override TResult Result => throw new InvalidOperationException("Operation Failed");

    public FailedOperationResult(TError error)
    {
        Success = false;
        Error = error;
    }
}