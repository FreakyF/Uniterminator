namespace Uniterminator.Persistence.Entities;

public record ParallelizeOperation : BaseEntity
{
    public required Guid SnapshotId { get; init; }
    public Snapshot Snapshot { get; init; }
    public required string ExpressionA { get; init; }
    public required string ExpressionB { get; init; }
    public required string OperationSymbol { get; init; }
}