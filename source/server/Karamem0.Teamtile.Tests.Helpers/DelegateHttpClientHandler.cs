//
// Copyright (c) 2021-2025 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Karamem0.Teamtile.Tests.Helpers;

public class DelegateHttpClientHandler(
    Func<HttpRequestMessage, CancellationToken, Task<HttpResponseMessage>> onSendAsync
) : HttpClientHandler
{

    private readonly Func<HttpRequestMessage, CancellationToken, Task<HttpResponseMessage>> onSendAsync = onSendAsync;

    protected override Task<HttpResponseMessage> SendAsync(
        HttpRequestMessage request,
        CancellationToken cancellationToken
    )
    {
        return this.onSendAsync(request, cancellationToken);
    }

}
