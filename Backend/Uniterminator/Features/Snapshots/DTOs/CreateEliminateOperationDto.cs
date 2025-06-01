using System.Diagnostics.CodeAnalysis;

namespace Uniterminator.Features.Snapshots.DTOs;

[SuppressMessage("ReSharper", "UnusedMember.Global")]
[SuppressMessage("ReSharper", "UnusedAutoPropertyAccessor.Global")]
[SuppressMessage("ReSharper", "AutoPropertyCanBeMadeGetOnly.Global")]
public record CreateEliminateOperationDto
{
    public string ExpressionA { get; init; } = null!;
    public string ExpressionB { get; init; } = null!;
    public string OperationSymbol { get; init; } = null!;
    public string ExpressionExtra { get; init; } = null!;
}