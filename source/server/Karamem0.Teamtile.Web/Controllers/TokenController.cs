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
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Identity.Client;
using System.Text.RegularExpressions;

namespace Karamem0.Teamtile.Controllers;

public partial class TokenController
{

    [GeneratedRegex(
        @"^Bearer\s+(?<token>.+)$",
        RegexOptions.IgnoreCase,
        "ja-JP"
    )]
    private static partial Regex BearerAuthorizationRegex();

    public static async Task<IResult> PostAsync(
        [FromServices()] ITokenService tokenService,
        [FromServices()] ILogger<TokenController> logger,
        [FromHeader(Name = "Authorization")] string authorization,
        [FromBody()] TokenRequest request
    )
    {
        try
        {
            logger.ActionExecuting();
            var regex = BearerAuthorizationRegex();
            var match = regex.Match(authorization);
            if (match.Success)
            {
                var accessToken = match.Groups["token"].Value;
                var response = await tokenService.InvokeAsync(request, accessToken);
                return Results.Ok(response);
            }
            else
            {
                return Results.Unauthorized();
            }
        }
        catch (MsalException ex)
        {
            if (ex.ErrorCode is "invalid_grant" or "interaction_required")
            {
                return Results.Forbid();
            }
            else
            {
                return Results.InternalServerError(ex);
            }
        }
        catch (Exception ex)
        {
            logger.UnhandledErrorOccurred(exception: ex);
            return Results.InternalServerError(ex);
        }
        finally
        {
            logger.ActionExecuted();
        }
    }

}
