using Mapster;
using Uniterminator.Features.Snapshots.DTOs;
using Uniterminator.Persistence.Entities;

namespace Uniterminator.Features.Snapshots.Mapping;

public static class MappingConfig
{
    public static void RegisterMappings()
    {
        TypeAdapterConfig<CreateParallelizeOperationDto, ParallelizeOperation>
            .NewConfig()
            .Map(dest => dest.Id, src => Guid.NewGuid())
            .Map(dest => dest.ExpressionA, src => src.ExpressionA)
            .Map(dest => dest.ExpressionB, src => src.ExpressionB)
            .Map(dest => dest.OperationSymbol, src => src.OperationSymbol)
            .Ignore(dest => dest.Snapshot)
            .Ignore(dest => dest.SnapshotId);

        TypeAdapterConfig<CreateEliminateOperationDto, EliminateOperation>
            .NewConfig()
            .Map(dest => dest.Id, src => Guid.NewGuid())
            .Map(dest => dest.ExpressionA, src => src.ExpressionA)
            .Map(dest => dest.ExpressionB, src => src.ExpressionB)
            .Map(dest => dest.OperationSymbol, src => src.OperationSymbol)
            .Map(dest => dest.ExpressionExtra, src => src.ExpressionExtra)
            .Ignore(dest => dest.Snapshot)
            .Ignore(dest => dest.SnapshotId);

        TypeAdapterConfig<CreateSnapshotDto, Snapshot>
            .NewConfig()
            .Map(dest => dest.Id, src => Guid.NewGuid())
            .Map(dest => dest.SnapshotTime, src => src.SnapshotTime)
            .Map(dest => dest.ParallelizeOperation,
                src => src.ParallelizeOperation != null
                    ? src.ParallelizeOperation.Adapt<ParallelizeOperation>()
                    : null)
            .Map(dest => dest.EliminateOperation,
                src => src.EliminateOperation != null
                    ? src.EliminateOperation.Adapt<EliminateOperation>()
                    : null);

        TypeAdapterConfig<ParallelizeOperation, GetParallelizeOperationDto>
            .NewConfig();

        TypeAdapterConfig<EliminateOperation, GetEliminateOperationDto>
            .NewConfig();

        TypeAdapterConfig<Snapshot, GetSnapshotDto>
            .NewConfig()
            .Map(dest => dest.ParallelizeOperation, src => src.ParallelizeOperation)
            .Map(dest => dest.EliminateOperation, src => src.EliminateOperation);
    }
}