using Uniterminator.Features.Snapshots.DTOs;

namespace Uniterminator.Features.Snapshots;

public interface ISnapshotService
{
    Task<List<GetSnapshotDto>> GetAllAsync();
    Task<GetSnapshotDto?> GetByIdAsync(Guid id);
    Task<GetSnapshotDto> CreateAsync(CreateSnapshotDto dto);
}