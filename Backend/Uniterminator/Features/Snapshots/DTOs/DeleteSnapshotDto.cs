using System.Diagnostics.CodeAnalysis;

namespace Uniterminator.Features.Snapshots.DTOs;

[SuppressMessage("ReSharper", "UnusedMember.Global")]
[SuppressMessage("ReSharper", "UnusedAutoPropertyAccessor.Global")]
[SuppressMessage("ReSharper", "AutoPropertyCanBeMadeGetOnly.Global")]
public abstract record DeleteSnapshotDto
{
    public Guid Id { get; init; }
}