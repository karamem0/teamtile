//
// Copyright (c) 2021-2025 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

using Karamem0.Teamtile.Logging;
using Karamem0.Teamtile.Models;
using Karamem0.Teamtile.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Identity.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Karamem0.Teamtile.Controllers;

[ApiController()]
[Authorize()]
[Route("api/token")]
public class TokenController(ITokenService tokenService, ILogger<TokenController> logger) : Controller
{

    private readonly ITokenService tokenService = tokenService;

    private readonly ILogger<TokenController> logger = logger;

    [HttpPost()]
    public async Task<IActionResult> PostAsync([FromBody] TokenRequest request)
    {
        try
        {
            this.logger.ActionExecuting();
            var authorizationHeader = this.Request.Headers.Authorization;
            var authorizationHeaderValue = authorizationHeader.FirstOrDefault();
            if (authorizationHeaderValue is null)
            {
                return this.StatusCode(StatusCodes.Status401Unauthorized);
            }
            var authorizationHeaderValuePair = authorizationHeaderValue.Split(" ");
            if (authorizationHeaderValuePair[0] is not "Bearer")
            {
                return this.StatusCode(StatusCodes.Status401Unauthorized);
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
                    StatusCodes.Status403Forbidden,
                    new TokenResponse()
                    {
                        Error = ex.ErrorCode
                    }
                );
            }
            else
            {
                return this.StatusCode(
                    StatusCodes.Status500InternalServerError,
                    new TokenResponse()
                    {
                        Error = ex.ErrorCode
                    }
                );
            }
        }
        catch (Exception ex)
        {
            this.logger.UnhandledErrorOccurred(exception: ex);
            return new StatusCodeResult(StatusCodes.Status500InternalServerError);
        }
        finally
        {
            this.logger.ActionExecuted();
        }
    }

}
