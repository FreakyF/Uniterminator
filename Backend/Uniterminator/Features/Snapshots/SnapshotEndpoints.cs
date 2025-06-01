using Uniterminator.Features.Snapshots.DTOs;

namespace Uniterminator.Features.Snapshots;

public static class SnapshotEndpoints
{
    private const string BaseRoute = "/snapshots";

    public static void MapSnapshotEndpoints(this WebApplication app)
    {
        app.MapGet(BaseRoute, GetAllSnapshots).WithName("GetAllSnapshots");
        app.MapGet($"{BaseRoute}/{{id:guid}}", GetSnapshotById).WithName("GetSnapshotById");
        app.MapPost(BaseRoute, CreateSnapshot).WithName("CreateSnapshot");
        app.MapDelete($"{BaseRoute}/{{id:guid}}", DeleteSnapshotById).WithName("DeleteSnapshotById");
    }

    private static async Task<IResult> GetAllSnapshots(ISnapshotService service)
    {
        var dtoList = await service.GetAllAsync();
        return Results.Ok(dtoList);
    }

    private static async Task<IResult> GetSnapshotById(Guid id, ISnapshotService service)
    {
        var dto = await service.GetByIdAsync(id);
        return dto is not null
            ? Results.Ok(dto)
            : Results.NotFound();
    }

    private static async Task<IResult> CreateSnapshot(CreateSnapshotDto dto, ISnapshotService service)
    {
        try
        {
            var createdDto = await service.CreateAsync(dto);
            return Results.Created($"{BaseRoute}/{createdDto.Id}", createdDto);
        }
        catch (ArgumentException ex)
        {
            return Results.BadRequest(ex.Message);
        }
    }

    private static async Task<IResult> DeleteSnapshotById(Guid id, ISnapshotService service)
    {
        var deletedDto = await service.DeleteAsync(id);

        return deletedDto is null ? Results.NotFound() : Results.NoContent();
    }
}