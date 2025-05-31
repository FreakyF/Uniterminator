namespace Uniterminator.Entities;

public record BaseEntity
{
    public required Guid Id { get; init; }
}