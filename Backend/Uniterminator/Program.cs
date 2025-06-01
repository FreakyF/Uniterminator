using Microsoft.EntityFrameworkCore;
using Uniterminator.Extensions;
using Uniterminator.Persistence.DatabaseContext;

namespace Uniterminator;

public static class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        builder.Services.AddApplicationServices(builder.Configuration);

        var app = builder.Build();

        using (var scope = app.Services.CreateScope())
        {
            var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
            db.Database.Migrate();
        }

        app.UseApplicationConfiguration();

        app.Run();
    }
}