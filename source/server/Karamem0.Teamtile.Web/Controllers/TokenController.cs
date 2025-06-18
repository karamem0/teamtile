//
// Copyright (c) 2021-2025 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

using Karamem0.Teamtile.Models;
using Karamem0.Teamtile.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace Karamem0.Teamtile.Controllers;

[ApiController()]
[Authorize()]
[Route("api/token")]
public class TokenController(ITokenService tokenService) : Controller
{

    private readonly ITokenService tokenService = tokenService;

    [HttpPost()]
    public async Task<IActionResult> PostAsync([FromBody] TokenRequest request)
    {
        try
        {
            var authorizationHeader = this.Request.Headers.Authorization;
            var authorizationHeaderValue = authorizationHeader.FirstOrDefault();
            if (authorizationHeaderValue is null)
            {
                return this.StatusCode((int)HttpStatusCode.Unauthorized);
            }
            var authorizationHeaderValuePair = authorizationHeaderValue.Split(" ");
            if (authorizationHeaderValuePair[0] is not "Bearer")
            {
                return this.StatusCode((int)HttpStatusCode.Unauthorized);
            }
            var accessToken = await this.tokenService.ExchangeTokenAsync(request.Scope.Split(' '), authorizationHeaderValuePair[1]);
            return this.Ok(
                new TokenResponse()
                {
                    Token = accessToken
                }
            );
        }
        catch (MsalException ex)
        {
            if (ex.ErrorCode is "invalid_grant" or "interaction_required")
            {
                return this.StatusCode(
                    (int)HttpStatusCode.Forbidden,
                    new TokenResponse()
                    {
                        Error = ex.ErrorCode
                    }
                );
            }
            else
            {
                return this.StatusCode(
                    (int)HttpStatusCode.InternalServerError,
                    new TokenResponse()
                    {
                        Error = ex.ErrorCode
                    }
                );
            }
        }
    }

}
