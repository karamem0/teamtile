//
// Copyright (c) 2021-2026 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

using Karamem0.Teamtile.Models;
using Karamem0.Teamtile.Repositories;

namespace Karamem0.Teamtile.Services;

public interface ITokenService
{

    Task<TokenResponse> InvokeAsync(TokenRequest request, string accessToken);

}

public class TokenService(ITokenRepository repository) : ITokenService
{

    private readonly ITokenRepository repository = repository;

    public async Task<TokenResponse> InvokeAsync(TokenRequest request, string accessToken)
    {
        return new TokenResponse()
        {
            Token = await this.repository.ExchangeTokenAsync(request.Scope.Split(' '), accessToken)
        };
    }

}
