using Microsoft.EntityFrameworkCore;
using Uniterminator.Persistence.Entities;

namespace Uniterminator.Persistence.DatabaseContext;

public interface IAppDbContext : IDisposable
{
    DbSet<Snapshot> Snapshots { get; }
    Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
}