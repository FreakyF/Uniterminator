using System.Diagnostics.CodeAnalysis;

namespace Uniterminator.Features.Snapshots.DTOs;

[SuppressMessage("ReSharper", "UnusedMember.Global")]
public record GetParallelizeOperationDto
{
    public Guid Id { get; init; }
    public string ExpressionA { get; init; } = null!;
    public string ExpressionB { get; init; } = null!;
    public string OperationSymbol { get; init; } = null!;
}