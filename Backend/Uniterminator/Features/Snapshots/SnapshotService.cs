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

    public async Task<DeleteSnapshotDto?> DeleteAsync(Guid id)
    {
        var snapshot = await dbContext.Snapshots
            .FirstOrDefaultAsync(s => s.Id == id);

        if (snapshot == null)
        {
            return null;
        }

        dbContext.Snapshots.Remove(snapshot);
        await dbContext.SaveChangesAsync();

        var deletedDto = snapshot.Adapt<DeleteSnapshotDto>();
        return deletedDto;
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
        var snapshotId = Guid.NewGuid();   // use once, reuse everywhere

        // child objects *first* – we can refer to snapshotId, but not to snapshotEntity
        ParallelizeOperation? parallel = null;
        if (dto.ParallelizeOperation is not null)
        {
            var p = dto.ParallelizeOperation;
            parallel = new ParallelizeOperation
            {
                Id            = Guid.NewGuid(),
                SnapshotId    = snapshotId,
                ExpressionA   = p.ExpressionA,
                ExpressionB   = p.ExpressionB,
                OperationSymbol = p.OperationSymbol
            };
        }

        EliminateOperation? eliminate = null;
        if (dto.EliminateOperation is not null)
        {
            var e = dto.EliminateOperation;
            eliminate = new EliminateOperation
            {
                Id            = Guid.NewGuid(),
                SnapshotId    = snapshotId,
                ExpressionA   = e.ExpressionA,
                ExpressionB   = e.ExpressionB,
                OperationSymbol = e.OperationSymbol,
                ExpressionExtra = e.ExpressionExtra
            };
        }

        // now create the parent – *all* init-only props are set here
        return new Snapshot
        {
            Id                 = snapshotId,
            SnapshotName       = dto.SnapshotName,
            ParallelizeOperation = parallel,
            EliminateOperation   = eliminate
        };
    }
}