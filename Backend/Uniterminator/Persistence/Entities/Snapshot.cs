namespace Uniterminator.Persistence.Entities;

public record Snapshot : BaseEntity
{
    public required string SnapshotName { get; init; }
    public ParallelizeOperation? ParallelizeOperation { get; init; }
    public EliminateOperation? EliminateOperation { get; init; }
}