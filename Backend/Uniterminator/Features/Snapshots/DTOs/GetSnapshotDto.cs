using System.Diagnostics.CodeAnalysis;

namespace Uniterminator.Features.Snapshots.DTOs;

[SuppressMessage("ReSharper", "UnusedMember.Global")]
[SuppressMessage("ReSharper", "UnusedAutoPropertyAccessor.Global")]
public abstract record GetSnapshotDto
{
    public Guid Id { get; init; }
    public string SnapshotName { get; init; }  = null!;
    public GetParallelizeOperationDto? ParallelizeOperation { get; init; }
    public GetEliminateOperationDto? EliminateOperation { get; init; }
}