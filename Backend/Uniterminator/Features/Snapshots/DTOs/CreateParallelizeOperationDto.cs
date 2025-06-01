using System.Diagnostics.CodeAnalysis;

namespace Uniterminator.DTOs;

[SuppressMessage("ReSharper", "UnusedAutoPropertyAccessor.Global")]
[SuppressMessage("ReSharper", "AutoPropertyCanBeMadeGetOnly.Global")]
public abstract record CreateParallelizeOperationDto
{
    public string ExpressionA { get; init; } = null!;
    public string ExpressionB { get; init; } = null!;
    public string OperationSymbol { get; init; } = null!;
}