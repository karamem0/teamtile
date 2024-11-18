//
// Copyright (c) 2021-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

using Karamem0.Teamtile.Models;
using Karamem0.Teamtile.Tests.Helpers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using NSubstitute;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace Karamem0.Teamtile.Controllers.Tests;

public class TokenControllerTests
{

    private static readonly string AccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkdW1teS1jbGllbnQtaWQiLCJ0aWQiOiJkdW1teS10ZW5hbnQtaWQifQ.t65aZipKY8AWHyE6rlRcvtt54q9RIkWFR7vasXxfKck";

    private static readonly string ClientId = "d2fa1d7a-1576-4135-b1dc-97b62bca6433";

    private static readonly string ClientSecret = "NWIyYzUwM2QtOWE5Mi00NjExLWE1ZTktZDViZGVhMWUzZDM2";

    private static readonly string TenantId = "ce18f42c-6baa-4d90-9733-f234e9fb0f7c";

    [Test()]
    public async Task PostAsync_Ok()
    {
        // Setup
        var request = new TokenRequest()
        {
            Scope = "user_impersonation"
        };
        var httpClientFactory = Substitute.For<IHttpClientFactory>();
        _ = httpClientFactory.CreateClient()
            .Returns(new HttpClient(new DelegateHttpClientHandler(
            (request, cancellationToken) => Task.FromResult(
                new HttpResponseMessage()
                {
                    StatusCode = HttpStatusCode.OK,
                    Content = new StringContent(
                        JsonSerializer.Serialize(new Dictionary<string, string?>()
                        {
                            ["access_token"] = AccessToken
                        })
                    )
                }
            )
        )));
        var configuration = new ConfigurationBuilder()
            .AddInMemoryCollection(new Dictionary<string, string?>
            {
                ["AzureAD:Audience"] = ClientId,
                ["AzureAD:ClientId"] = ClientId,
                ["AzureAD:ClientSecret"] = ClientSecret,
                ["AzureAD:Instance"] = "https://login.microsoftonline.com",
                ["AzureAD:TenantId"] = TenantId
            })
            .Build();
        var httpContext = new DefaultHttpContext();
        httpContext.Request.Headers.Append("Authorization", $"Bearer {AccessToken}");
        var controller = new TokenController(httpClientFactory, configuration)
        {
            ControllerContext = new ControllerContext()
            {
                HttpContext = httpContext
            }
        };
        // Execute
        var result = await controller.PostAsync(request) as ObjectResult;
        // Assert
        Assert.Multiple(() =>
        {
            Assert.That(result, Is.Not.Null);
            Assert.That(result?.StatusCode, Is.EqualTo((int)HttpStatusCode.OK));
            Assert.That(((TokenResponse?)result?.Value)?.Token, Is.EqualTo(AccessToken));
        });
    }

    [Test()]
    public async Task PostAsync_Unauthorized()
    {
        // Setup
        var request = new TokenRequest()
        {
            Scope = "user_impersonation"
        };
        var httpClientFactory = Substitute.For<IHttpClientFactory>();
        _ = httpClientFactory.CreateClient()
            .Returns(new HttpClient(new DelegateHttpClientHandler(
            (request, cancellationToken) => Task.FromResult(
                new HttpResponseMessage()
                {
                    StatusCode = HttpStatusCode.OK,
                    Content = new StringContent(
                        JsonSerializer.Serialize(new Dictionary<string, string?>()
                        {
                            ["access_token"] = AccessToken
                        })
                    )
                }
            )
        )));
        var configuration = new ConfigurationBuilder()
            .AddInMemoryCollection(new Dictionary<string, string?>
            {
                ["AzureAD:Audience"] = ClientId,
                ["AzureAD:ClientId"] = ClientId,
                ["AzureAD:ClientSecret"] = ClientSecret,
                ["AzureAD:Instance"] = "https://login.microsoftonline.com",
                ["AzureAD:TenantId"] = TenantId
            })
            .Build();
        var httpContext = new DefaultHttpContext();
        var controller = new TokenController(httpClientFactory, configuration)
        {
            ControllerContext = new ControllerContext()
            {
                HttpContext = httpContext
            }
        };
        // Execute
        var result = await controller.PostAsync(request) as StatusCodeResult;
        // Assert
        Assert.Multiple(() =>
        {
            Assert.That(result, Is.Not.Null);
            Assert.That(result?.StatusCode, Is.EqualTo((int)HttpStatusCode.Unauthorized));
        });
    }

    [Test()]
    public async Task PostAsync_Forbidden()
    {
        // Setup
        var request = new TokenRequest()
        {
            Scope = "user_impersonation"
        };
        var httpClientFactory = Substitute.For<IHttpClientFactory>();
        _ = httpClientFactory.CreateClient()
            .Returns(new HttpClient(new DelegateHttpClientHandler(
            (request, cancellationToken) => Task.FromResult(
                new HttpResponseMessage()
                {
                    StatusCode = HttpStatusCode.BadRequest,
                    Content = new StringContent(
                        JsonSerializer.Serialize(new Dictionary<string, string?>()
                        {
                            ["error"] = "invalid_grant",
                            ["error_description"] = "Something went wrong"
                        })
                    )
                }
            )
        )));
        var configuration = new ConfigurationBuilder()
            .AddInMemoryCollection(new Dictionary<string, string?>
            {
                ["AzureAD:Audience"] = ClientId,
                ["AzureAD:ClientId"] = ClientId,
                ["AzureAD:ClientSecret"] = ClientSecret,
                ["AzureAD:Instance"] = "https://login.microsoftonline.com",
                ["AzureAD:TenantId"] = TenantId
            })
            .Build();
        var httpContext = new DefaultHttpContext();
        httpContext.Request.Headers.Append("Authorization", $"Bearer {AccessToken}");
        var controller = new TokenController(httpClientFactory, configuration)
        {
            ControllerContext = new ControllerContext()
            {
                HttpContext = httpContext
            }
        };
        // Execute
        var result = await controller.PostAsync(request) as ObjectResult;
        // Assert
        Assert.Multiple(() =>
        {
            Assert.That(result, Is.Not.Null);
            Assert.That(result?.StatusCode, Is.EqualTo((int)HttpStatusCode.Forbidden));
            Assert.That(((TokenResponse?)result?.Value)?.Error, Is.EqualTo("Something went wrong"));
        });
    }

    [Test()]
    public async Task PostAsync_InternalServerError()
    {
        // Setup
        var request = new TokenRequest()
        {
            Scope = "user_impersonation"
        };
        var httpClientFactory = Substitute.For<IHttpClientFactory>();
        _ = httpClientFactory.CreateClient()
            .Returns(new HttpClient(new DelegateHttpClientHandler(
            (request, cancellationToken) => Task.FromResult(
                new HttpResponseMessage()
                {
                    StatusCode = HttpStatusCode.BadRequest,
                    Content = new StringContent(
                        JsonSerializer.Serialize(new Dictionary<string, string?>()
                        {
                            ["error"] = "unknown_error",
                            ["error_description"] = "Something went wrong"
                        })
                    )
                }
            )
        )));
        var configuration = new ConfigurationBuilder()
            .AddInMemoryCollection(new Dictionary<string, string?>
            {
                ["AzureAD:Audience"] = ClientId,
                ["AzureAD:ClientId"] = ClientId,
                ["AzureAD:ClientSecret"] = ClientSecret,
                ["AzureAD:Instance"] = "https://login.microsoftonline.com",
                ["AzureAD:TenantId"] = TenantId
            })
            .Build();
        var httpContext = new DefaultHttpContext();
        httpContext.Request.Headers.Append("Authorization", $"Bearer {AccessToken}");
        var controller = new TokenController(httpClientFactory, configuration)
        {
            ControllerContext = new ControllerContext()
            {
                HttpContext = httpContext
            }
        };
        // Execute
        var result = await controller.PostAsync(request) as ObjectResult;
        // Assert
        Assert.Multiple(() =>
        {
            Assert.That(result, Is.Not.Null);
            Assert.That(result?.StatusCode, Is.EqualTo((int)HttpStatusCode.InternalServerError));
            Assert.That(((TokenResponse?)result?.Value)?.Error, Is.EqualTo("Something went wrong"));
        });
    }

}
