using Uniterminator.DTOs;

namespace Uniterminator;

public interface ISnapshotService
{
    Task<List<GetSnapshotDto>> GetAllAsync();
    Task<GetSnapshotDto?> GetByIdAsync(Guid id);
    Task<GetSnapshotDto> CreateAsync(CreateSnapshotDto dto);
}