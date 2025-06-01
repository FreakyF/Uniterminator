namespace Uniterminator.Entities;

public record Snapshot : BaseEntity
{
    public required DateTime SnapshotTime { get; init; }
    public ParallelizeOperation? ParallelizeOperation { get; init; }
    public EliminateOperation? EliminateOperation { get; init; }
}