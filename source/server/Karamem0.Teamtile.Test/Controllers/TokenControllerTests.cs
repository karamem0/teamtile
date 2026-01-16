//
// Copyright (c) 2021-2026 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

using Karamem0.Teamtile.Controllers;
using Karamem0.Teamtile.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.Extensions.Logging;
using Microsoft.Identity.Client;
using NSubstitute;
using NSubstitute.ExceptionExtensions;
using NUnit.Framework;

namespace Karamem0.Teamtile.Services.Tests;

public class TokenControllerTests
{

    [Test()]
    public async Task PostAsync_ShouldReturnsOk()
    {
        // Setup
        var tokenService = Substitute.For<ITokenService>();
        _ = tokenService
            .InvokeAsync(Arg.Any<TokenRequest>(), Arg.Any<string>())
            .Returns(new TokenResponse());
        var logger = Substitute.For<ILogger<TokenController>>();
        var authorization = "Bearer client_token";
        var request = new TokenRequest()
        {
            Scope = "user_impersonation"
        };
        // Execute
        var actual = await TokenController.PostAsync(
            tokenService,
            logger,
            authorization,
            request
        );
        // Assert
        using (Assert.EnterMultipleScope())
        {
            Assert.That(actual, Is.Not.Null);
            Assert.That(actual, Is.TypeOf<Ok<TokenResponse>>());
        }
    }

    [Test()]
    public async Task PostAsync_ShouldReturnsUnauthorized()
    {
        // Setup
        var tokenService = Substitute.For<ITokenService>();
        _ = tokenService
            .InvokeAsync(Arg.Any<TokenRequest>(), Arg.Any<string>())
            .Returns(new TokenResponse());
        var logger = Substitute.For<ILogger<TokenController>>();
        var authorization = "Bearer";
        var request = new TokenRequest()
        {
            Scope = "user_impersonation"
        };
        // Execute
        var actual = await TokenController.PostAsync(
            tokenService,
            logger,
            authorization,
            request
        );
        // Assert
        using (Assert.EnterMultipleScope())
        {
            Assert.That(actual, Is.Not.Null);
            Assert.That(actual, Is.TypeOf<UnauthorizedHttpResult>());
        }
    }

    [Test()]
    public async Task PostAsync_ShouldReturnsForbidden()
    {
        // Setup
        var tokenService = Substitute.For<ITokenService>();
        _ = tokenService
            .InvokeAsync(Arg.Any<TokenRequest>(), Arg.Any<string>())
            .Throws(new MsalException("invalid_grant"));
        var logger = Substitute.For<ILogger<TokenController>>();
        var authorization = "Bearer client_token";
        var request = new TokenRequest()
        {
            Scope = "user_impersonation"
        };
        // Execute
        var actual = await TokenController.PostAsync(
            tokenService,
            logger,
            authorization,
            request
        );
        // Assert
        using (Assert.EnterMultipleScope())
        {
            Assert.That(actual, Is.Not.Null);
            Assert.That(actual, Is.TypeOf<ForbidHttpResult>());
        }
    }

    [Test()]
    public async Task PostAsync_ShouldReturnsInternalServerError()
    {
        // Setup
        var tokenService = Substitute.For<ITokenService>();
        _ = tokenService
            .InvokeAsync(Arg.Any<TokenRequest>(), Arg.Any<string>())
            .Throws(new MsalException("unknown_error"));
        var logger = Substitute.For<ILogger<TokenController>>();
        var authorization = "Bearer client_token";
        var request = new TokenRequest()
        {
            Scope = "user_impersonation"
        };
        // Execute
        var actual = await TokenController.PostAsync(
            tokenService,
            logger,
            authorization,
            request
        );
        // Assert
        using (Assert.EnterMultipleScope())
        {
            Assert.That(actual, Is.Not.Null);
            Assert.That(actual, Is.TypeOf<InternalServerError<MsalException>>());
        }
    }

}
