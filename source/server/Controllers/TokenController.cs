//
// Copyright (c) 2023 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

using Karamem0.Teamtile.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Identity.Web;
using Microsoft.IdentityModel.JsonWebTokens;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;

namespace Karamem0.Teamtile.Controllers
{

    [ApiController()]
    [Authorize()]
    [Route("api/token")]
    public class TokenController : Controller
    {

        private readonly HttpClient httpClient;

        private readonly MicrosoftIdentityOptions identityOptions;

        public TokenController(IHttpClientFactory httpClientFactory, IConfiguration configuration)
        {
            this.httpClient = httpClientFactory.CreateClient();
            this.identityOptions = configuration.GetSection("AzureAD").Get<MicrosoftIdentityOptions>();
        }

        [HttpPost()]
        public async Task<IActionResult> PostAsync([FromBody] TokenRequest request)
        {
            var authorizationHeader = this.Request.Headers["Authorization"].ToString().Split(" ");
            var clientToken = authorizationHeader[1];
            var jwtToken = new JsonWebToken(clientToken);
            var tenantId = jwtToken.GetPayloadValue<string>("tid");
            var httpRequestUri = $"https://login.microsoft.com/{tenantId}/oauth2/v2.0/token";
            var httpRequestMessage = new HttpRequestMessage(HttpMethod.Post, httpRequestUri)
            {
                Content = new FormUrlEncodedContent(new Dictionary<string, string>()
                {
                    ["grant_type"] = "urn:ietf:params:oauth:grant-type:jwt-bearer",
                    ["client_id"] = this.identityOptions.ClientId,
                    ["client_secret"] = this.identityOptions.ClientSecret,
                    ["assertion"] = clientToken,
                    ["scope"] = request.Scope,
                    ["requested_token_use"] = "on_behalf_of",
                })
            };
            var httpResponseMessage = await this.httpClient.SendAsync(httpRequestMessage);
            var httpResponseContent = await httpResponseMessage.Content.ReadAsStringAsync();
            var httpResponseJson = JsonSerializer.Deserialize<Dictionary<string, object>>(httpResponseContent);
            if (httpResponseMessage.IsSuccessStatusCode)
            {
                var serverToken = httpResponseJson["access_token"].ToString();
                return this.Ok(new TokenResponse()
                {
                    Token = serverToken,
                });
            }
            else
            {
                var errorCode = httpResponseJson["error"].ToString();
                var errorDescription = httpResponseJson["error_description"].ToString();
                if (errorCode is "invalid_grant" or "interaction_required")
                {
                    return this.StatusCode(
                        (int)HttpStatusCode.Forbidden,
                        new TokenResponse()
                        {
                            Error = errorDescription,
                        });
                }
                else
                {
                    return this.StatusCode(
                        (int)HttpStatusCode.InternalServerError,
                        new TokenResponse()
                        {
                            Error = errorDescription,
                        });
                }
            }
        }

    }

}
