namespace Uniterminator.Persistence.Entities;

public record BaseEntity
{
    public required Guid Id { get; init; }
}