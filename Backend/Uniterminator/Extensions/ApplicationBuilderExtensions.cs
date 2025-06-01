using Scalar.AspNetCore;
using Uniterminator.Features.Snapshots;

namespace Uniterminator.Extensions;

public static class ApplicationBuilderExtensions
{
    public static void UseApplicationConfiguration(this WebApplication app)
    {
        if (app.Environment.IsDevelopment())
        {
            app.MapOpenApi();
            app.MapScalarApiReference();
        }

        app.UseHttpsRedirection();
        app.UseAuthorization();

        app.MapSnapshotEndpoints();
    }
}