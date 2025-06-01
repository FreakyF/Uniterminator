namespace Uniterminator.Persistence.Entities;

public record Snapshot : BaseEntity
{
    public required string SnapshotName { get; init; }
    public ParallelizeOperation? ParallelizeOperation { get; set; }
    public EliminateOperation? EliminateOperation { get; set; }
}