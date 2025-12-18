//
// Copyright (c) 2021-2025 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

using Karamem0.Teamtile.Repositories;
using Karamem0.Teamtile.Services;
using Microsoft.Extensions.DependencyInjection;

namespace Karamem0.Teamtile;

public static class ConfigureServices
{

    public static IServiceCollection AddServices(this IServiceCollection services)
    {
        _ = services.AddSingleton<ITokenService, TokenService>();
        return services;
    }

    public static IServiceCollection AddRepsitories(this IServiceCollection services)
    {
        _ = services.AddSingleton<ITokenRepository, TokenRepository>();
        return services;
    }

}
