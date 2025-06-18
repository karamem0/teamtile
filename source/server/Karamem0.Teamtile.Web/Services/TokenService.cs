//
// Copyright (c) 2021-2025 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

using Microsoft.Extensions.Options;
using Microsoft.Identity.Client;
using Microsoft.Identity.Web;
using Microsoft.IdentityModel.JsonWebTokens;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Karamem0.Teamtile.Services;

public interface ITokenService
{

    Task<string> ExchangeTokenAsync(string[] scopes, string accessToken);

}

public class TokenService(IOptions<MicrosoftIdentityOptions> options) : ITokenService
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
