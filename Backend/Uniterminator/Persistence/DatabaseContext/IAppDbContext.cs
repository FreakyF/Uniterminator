using Microsoft.EntityFrameworkCore;
using Uniterminator.Entities;

namespace Uniterminator.Persistence.DatabaseContext;

public interface IAppDbContext : IDisposable
{
    DbSet<Snapshot> Snapshots { get; }
    DbSet<ParallelizeOperation> ParallelizeOperations { get; }
    DbSet<EliminateOperation> EliminateOperations { get; }
    Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
}