using Mapster;
using Microsoft.EntityFrameworkCore;
using Uniterminator.Features.Snapshots.DTOs;
using Uniterminator.Persistence.DatabaseContext;
using Uniterminator.Persistence.Entities;

namespace Uniterminator.Features.Snapshots;

public class SnapshotService(IAppDbContext dbContext) : ISnapshotService
{
    public async Task<List<GetSnapshotDto>> GetAllAsync()
    {
        var snapshots = await dbContext.Snapshots
            .AsNoTracking()
            .Include(s => s.ParallelizeOperation)
            .Include(s => s.EliminateOperation)
            .ToListAsync();

        return snapshots.Adapt<List<GetSnapshotDto>>();
    }

    public async Task<GetSnapshotDto?> GetByIdAsync(Guid id)
    {
        var snapshot = await dbContext.Snapshots
            .AsNoTracking()
            .Include(s => s.ParallelizeOperation)
            .Include(s => s.EliminateOperation)
            .FirstOrDefaultAsync(s => s.Id == id);

        return snapshot?.Adapt<GetSnapshotDto>();
    }

    public async Task<GetSnapshotDto> CreateAsync(CreateSnapshotDto dto)
    {
        var validationError = ValidateCreateSnapshotDto(dto);
        if (!string.IsNullOrEmpty(validationError))
        {
            throw new ArgumentException(validationError);
        }

        var snapshotEntity = BuildSnapshotEntity(dto);
        dbContext.Snapshots.Add(snapshotEntity);
        await dbContext.SaveChangesAsync();

        return snapshotEntity.Adapt<GetSnapshotDto>();
    }

    private static string? ValidateCreateSnapshotDto(CreateSnapshotDto dto)
    {
        var hasParallelize = dto.ParallelizeOperation is not null;
        var hasEliminate = dto.EliminateOperation is not null;
        if (!hasParallelize && !hasEliminate)
        {
            return "At least one of the properties must be provided: ParallelizeOperation or EliminateOperation.";
        }

        return null;
    }

    private static Snapshot BuildSnapshotEntity(CreateSnapshotDto dto)
    {
        var snapshotEntity = new Snapshot
        {
            Id = Guid.NewGuid(),
            SnapshotTime = dto.SnapshotTime
        };

        if (dto.ParallelizeOperation is not null)
        {
            var p = dto.ParallelizeOperation; // CreateParallelizeOperationDto
            snapshotEntity = snapshotEntity with
            {
                ParallelizeOperation = new ParallelizeOperation
                {
                    Id = Guid.NewGuid(),
                    SnapshotId = snapshotEntity.Id,
                    Snapshot = snapshotEntity,
                    ExpressionA = p.ExpressionA,
                    ExpressionB = p.ExpressionB,
                    OperationSymbol = p.OperationSymbol
                }
            };
        }

        if (dto.EliminateOperation is null)
        {
            return snapshotEntity;
        }

        var e = dto.EliminateOperation;
        snapshotEntity = snapshotEntity with
        {
            EliminateOperation = new EliminateOperation
            {
                Id = Guid.NewGuid(),
                SnapshotId = snapshotEntity.Id,
                Snapshot = snapshotEntity,
                ExpressionA = e.ExpressionA,
                ExpressionB = e.ExpressionB,
                OperationSymbol = e.OperationSymbol,
                ExpressionExtra = e.ExpressionExtra
            }
        };

        return snapshotEntity;
    }
}