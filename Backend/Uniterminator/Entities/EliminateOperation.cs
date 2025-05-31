namespace Uniterminator.Entities;

public record EliminateOperation : BaseEntity
{
    public required Guid SnapshotId { get; init; }
    public required Snapshot Snapshot { get; init; }
    public required string ExpressionA { get; init; }
    public required string ExpressionB { get; init; }
    public required string OperationSymbol { get; init; }
    public required string ExpressionExtra { get; init; }
}