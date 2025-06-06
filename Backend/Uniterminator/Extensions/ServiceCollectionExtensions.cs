﻿using Microsoft.EntityFrameworkCore;
using Uniterminator.Features.Snapshots;
using Uniterminator.Features.Snapshots.Mapping;
using Uniterminator.Persistence.DatabaseContext;

namespace Uniterminator.Extensions;

public static class ServiceCollectionExtensions
{
    public static void AddApplicationServices(this IServiceCollection services,
        IConfiguration configuration)
    {
        var connectionString = configuration.GetConnectionString("DefaultConnection");
        services.AddDbContext<AppDbContext>(options =>
            options.UseSqlServer(connectionString));

        services.AddCors(options =>
        {
            options.AddPolicy(name: "Spa",
                policy =>
                {
                    policy.WithOrigins("http://localhost:4200")
                        .AllowAnyHeader()
                        .AllowAnyMethod();
                });
        });

        services.AddScoped<IAppDbContext>(provider => provider.GetRequiredService<AppDbContext>());
        services.AddScoped<ISnapshotService, SnapshotService>();

        MappingConfig.RegisterMappings();

        services.AddAuthorization();
        services.AddOpenApi();
    }
}