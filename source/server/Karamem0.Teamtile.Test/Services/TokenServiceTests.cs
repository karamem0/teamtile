//
// Copyright (c) 2021-2025 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

using Karamem0.Teamtile.Models;
using Karamem0.Teamtile.Repositories;
using NSubstitute;
using NUnit.Framework;

namespace Karamem0.Teamtile.Services.Tests;

public class TokenServiceTests
{

    [Test()]
    public async Task PostAsync_Success()
    {
        // Setup
        var tokenRepository = Substitute.For<ITokenRepository>();
        _ = tokenRepository
            .ExchangeTokenAsync(Arg.Any<string[]>(), Arg.Any<string>())
            .Returns("server_token");
        // Execute
        var request = new TokenRequest()
        {
            Scope = "user_impersonation"
        };
        var target = new TokenService(tokenRepository);
        var actual = await target.InvokeAsync(request, "client_token");
        // Assert
        using (Assert.EnterMultipleScope())
        {
            Assert.That(actual, Is.Not.Null);
        }
    }

}
