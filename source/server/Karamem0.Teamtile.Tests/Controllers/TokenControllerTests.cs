//
// Copyright (c) 2021-2025 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

using Karamem0.Teamtile.Models;
using Karamem0.Teamtile.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Client;
using NSubstitute;
using NSubstitute.ExceptionExtensions;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace Karamem0.Teamtile.Controllers.Tests;

public class TokenControllerTests
{

    [Test()]
    public async Task PostAsync_ShouldReturnsOk()
    {
        // Setup
        var tokenService = Substitute.For<ITokenService>();
        _ = tokenService
            .ExchangeTokenAsync(Arg.Any<string[]>(), Arg.Any<string>())
            .Returns("dummy-server-token");
        var httpContext = new DefaultHttpContext();
        httpContext.Request.Headers.Append("Authorization", $"Bearer dummy-client-token");
        // Execute
        var request = new TokenRequest()
        {
            Scope = "user_impersonation"
        };
        var controller = new TokenController(tokenService)
        {
            ControllerContext = new ControllerContext()
            {
                HttpContext = httpContext
            }
        };
        var result = await controller.PostAsync(request) as ObjectResult;
        // Assert
        Assert.Multiple(
            () =>
            {
                Assert.That(result?.StatusCode, Is.EqualTo((int)HttpStatusCode.OK));
                Assert.That(((TokenResponse?)result?.Value)?.Token, Is.EqualTo("dummy-server-token"));
            }
        );
    }

    [Test()]
    public async Task PostAsync_ShouldReturnsUnauthorized()
    {
        var tokenService = Substitute.For<ITokenService>();
        _ = tokenService
            .ExchangeTokenAsync(Arg.Any<string[]>(), Arg.Any<string>())
            .Returns("dummy-server-token");
        var httpContext = new DefaultHttpContext();
        // Execute
        var request = new TokenRequest()
        {
            Scope = "user_impersonation"
        };
        var controller = new TokenController(tokenService)
        {
            ControllerContext = new ControllerContext()
            {
                HttpContext = httpContext
            }
        };
        var result = await controller.PostAsync(request) as StatusCodeResult;
        // Assert
        Assert.That(result?.StatusCode, Is.EqualTo((int)HttpStatusCode.Unauthorized));
    }

    [Test()]
    public async Task PostAsync_ShouldReturnsForbidden()
    {
        // Setup
        var tokenService = Substitute.For<ITokenService>();
        _ = tokenService
            .ExchangeTokenAsync(Arg.Any<string[]>(), Arg.Any<string>())
            .Throws(new MsalException("invalid_grant"));
        var httpContext = new DefaultHttpContext();
        httpContext.Request.Headers.Append("Authorization", $"Bearer dummy-client-token");
        // Execute
        var request = new TokenRequest()
        {
            Scope = "user_impersonation"
        };
        var controller = new TokenController(tokenService)
        {
            ControllerContext = new ControllerContext()
            {
                HttpContext = httpContext
            }
        };
        var result = await controller.PostAsync(request) as ObjectResult;
       // Assert
        Assert.Multiple(
            () =>
            {
                Assert.That(result?.StatusCode, Is.EqualTo((int)HttpStatusCode.Forbidden));
                Assert.That(((TokenResponse?)result?.Value)?.Error, Is.EqualTo("invalid_grant"));
            }
        );
    }

    [Test()]
    public async Task PostAsync_ShouldReturnsInternalServerError()
    {
        // Setup
        var tokenService = Substitute.For<ITokenService>();
        _ = tokenService
            .ExchangeTokenAsync(Arg.Any<string[]>(), Arg.Any<string>())
            .Throws(new MsalException("unknown_error"));
        var httpContext = new DefaultHttpContext();
        httpContext.Request.Headers.Append("Authorization", $"Bearer dummy-client-token");
        // Execute
        var request = new TokenRequest()
        {
            Scope = "user_impersonation"
        };
        var controller = new TokenController(tokenService)
        {
            ControllerContext = new ControllerContext()
            {
                HttpContext = httpContext
            }
        };
        var result = await controller.PostAsync(request) as ObjectResult;
       // Assert
        Assert.Multiple(
            () =>
            {
                Assert.That(result?.StatusCode, Is.EqualTo((int)HttpStatusCode.InternalServerError));
                Assert.That(((TokenResponse?)result?.Value)?.Error, Is.EqualTo("unknown_error"));
            }
        );
    }

}
