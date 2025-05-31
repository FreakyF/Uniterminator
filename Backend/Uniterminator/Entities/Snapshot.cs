namespace Uniterminator.Entities;

public record Snapshot : BaseEntity
{
    public required DateTime SnapshotTime { get; init; }

    public required IReadOnlyList<ParallelizeOperation> ParallelizeOperations { get; init; } =
        new List<ParallelizeOperation>();

    public required IReadOnlyList<EliminateOperation> EliminateOperations { get; init; } =
        new List<EliminateOperation>();
}