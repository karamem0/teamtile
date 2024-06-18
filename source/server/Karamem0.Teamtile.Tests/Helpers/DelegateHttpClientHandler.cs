//
// Copyright (c) 2021-2024 karamem0
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

namespace Karamem0.Teamtile.Helpers;

public class DelegateHttpClientHandler : HttpClientHandler
{

    private readonly Func<HttpRequestMessage, CancellationToken, Task<HttpResponseMessage>> onSendAsync;

    public DelegateHttpClientHandler(Func<HttpRequestMessage, CancellationToken, Task<HttpResponseMessage>> onSendAsync)
    {
        this.onSendAsync = onSendAsync;
    }

    protected override Task<HttpResponseMessage> SendAsync(HttpRequestMessage request, CancellationToken cancellationToken)
    {
        return this.onSendAsync(request, cancellationToken);
    }

}
