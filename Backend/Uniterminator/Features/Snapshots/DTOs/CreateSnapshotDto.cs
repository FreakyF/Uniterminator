using System.Diagnostics.CodeAnalysis;

namespace Uniterminator.DTOs;

[SuppressMessage("ReSharper", "UnusedMember.Global")]
[SuppressMessage("ReSharper", "UnusedAutoPropertyAccessor.Global")]
public abstract record CreateSnapshotDto
{
    public DateTime SnapshotTime { get; init; }
    public CreateParallelizeOperationDto? ParallelizeOperation { get; init; }
    public CreateEliminateOperationDto? EliminateOperation { get; init; }
}