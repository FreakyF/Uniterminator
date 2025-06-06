﻿using Microsoft.EntityFrameworkCore;
using Uniterminator.Persistence.Entities;

namespace Uniterminator.Persistence.DatabaseContext;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options), IAppDbContext
{
    public static DbSet<ParallelizeOperation> ParallelizeOperations => null!;
    public static DbSet<EliminateOperation> EliminateOperations => null!;
    public DbSet<Snapshot> Snapshots { get; init; } = null!;

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

        entity.Property(s => s.SnapshotName)
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
            .WithOne(s => s.ParallelizeOperation)
            .HasForeignKey<ParallelizeOperation>(po => po.SnapshotId)
            .OnDelete(DeleteBehavior.Cascade);

        entity.HasIndex(po => po.SnapshotId)
            .IsUnique();
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
            .WithOne(s => s.EliminateOperation)
            .HasForeignKey<EliminateOperation>(eo => eo.SnapshotId)
            .OnDelete(DeleteBehavior.Cascade);

        entity.HasIndex(eo => eo.SnapshotId)
            .IsUnique();
    }
}