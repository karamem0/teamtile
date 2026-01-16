//
// Copyright (c) 2021-2026 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

using Microsoft.Extensions.Options;
using Microsoft.Identity.Client;
using Microsoft.Identity.Web;
using Microsoft.IdentityModel.JsonWebTokens;

namespace Karamem0.Teamtile.Repositories;

public interface ITokenRepository
{

    Task<string> ExchangeTokenAsync(string[] scopes, string accessToken);

}

public class TokenRepository(IOptions<MicrosoftIdentityOptions> options) : ITokenRepository
{

    private readonly MicrosoftIdentityOptions options = options.Value;

    public async Task<string> ExchangeTokenAsync(string[] scopes, string accessToken)
    {
        var jwtToken = new JsonWebToken(accessToken);
        var tenantId = jwtToken.GetPayloadValue<string>("tid");
        var msalApplication = ConfidentialClientApplicationBuilder
            .Create(this.options.ClientId)
            .WithClientSecret(this.options.ClientSecret)
            .WithAuthority(this.options.Instance, tenantId)
            .Build();
        var authResult = await msalApplication
            .AcquireTokenOnBehalfOf(scopes, new UserAssertion(accessToken))
            .ExecuteAsync()
            .ConfigureAwait(false);
        return authResult.AccessToken;
    }

}
