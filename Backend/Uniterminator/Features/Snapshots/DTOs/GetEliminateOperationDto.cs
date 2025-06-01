using System.Diagnostics.CodeAnalysis;

namespace Uniterminator.DTOs;

[SuppressMessage("ReSharper", "UnusedMember.Global")]
public abstract record GetEliminateOperationDto
{
    public Guid Id { get; init; }
    public string ExpressionA { get; init; } = null!;
    public string ExpressionB { get; init; } = null!;
    public string OperationSymbol { get; init; } = null!;
    public string ExpressionExtra { get; init; } = null!;
}