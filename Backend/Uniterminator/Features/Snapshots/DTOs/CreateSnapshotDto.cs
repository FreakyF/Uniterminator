using System.Diagnostics.CodeAnalysis;

namespace Uniterminator.Features.Snapshots.DTOs;

[SuppressMessage("ReSharper", "UnusedMember.Global")]
[SuppressMessage("ReSharper", "UnusedAutoPropertyAccessor.Global")]
[SuppressMessage("ReSharper", "AutoPropertyCanBeMadeGetOnly.Global")]
public record CreateSnapshotDto
{
    public string SnapshotName { get; init; } = null!;
    public CreateParallelizeOperationDto? ParallelizeOperation { get; init; }
    public CreateEliminateOperationDto? EliminateOperation { get; init; }
}