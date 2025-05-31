using Microsoft.EntityFrameworkCore;
using Uniterminator.Entities;

namespace Uniterminator.Persistence.DatabaseContext;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options), IAppDbContext
{
    public DbSet<Snapshot> Snapshots { get; } = null!;
    public DbSet<ParallelizeOperation> ParallelizeOperations { get; } = null!;
    public DbSet<EliminateOperation> EliminateOperations { get; } = null!;

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        ConfigureSnapshot(modelBuilder);
        ConfigureParallelizeOperation(modelBuilder);
        ConfigureEliminateOperation(modelBuilder);
    }

    private static void ConfigureSnapshot(ModelBuilder modelBuilder)
    {
        var entity = modelBuilder.Entity<Snapshot>();

        entity.HasKey(s => s.Id);

        entity.Property(s => s.SnapshotTime)
            .IsRequired();
    }

    private static void ConfigureParallelizeOperation(ModelBuilder modelBuilder)
    {
        var entity = modelBuilder.Entity<ParallelizeOperation>();

        entity.HasKey(po => po.Id);

        entity.Property(po => po.ExpressionA)
            .IsRequired();
        entity.Property(po => po.ExpressionB)
            .IsRequired();
        entity.Property(po => po.OperationSymbol)
            .IsRequired();

        entity.HasOne(po => po.Snapshot)
            .WithMany(s => s.ParallelizeOperations)
            .HasForeignKey(po => po.SnapshotId)
            .OnDelete(DeleteBehavior.Cascade);
    }

    private static void ConfigureEliminateOperation(ModelBuilder modelBuilder)
    {
        var entity = modelBuilder.Entity<EliminateOperation>();

        entity.HasKey(eo => eo.Id);

        entity.Property(eo => eo.ExpressionA)
            .IsRequired();
        entity.Property(eo => eo.ExpressionB)
            .IsRequired();
        entity.Property(eo => eo.OperationSymbol)
            .IsRequired();
        entity.Property(eo => eo.ExpressionExtra)
            .IsRequired();

        entity.HasOne(eo => eo.Snapshot)
            .WithMany(s => s.EliminateOperations)
            .HasForeignKey(eo => eo.SnapshotId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}