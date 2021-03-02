using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.JsonWebTokens;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;

namespace Karamem0.Teamtile.Controllers
{

    [ApiController()]
    [Route("token")]
    public class TokenController : Controller
    {

        private readonly HttpClient httpClient;

        private readonly string authClientId;

        private readonly string authClientSecret;

        private readonly string authScope;

        public TokenController(IHttpClientFactory httpClientFactory, IConfiguration configuration)
        {
            this.httpClient = httpClientFactory.CreateClient();
            this.authClientId = configuration.GetValue<string>("Auth:ClientId");
            this.authClientSecret = configuration.GetValue<string>("Auth:ClientSecret");
            this.authScope = configuration.GetValue<string>("Auth:Scope");
        }

        [HttpPost()]
        public async Task<IActionResult> PostAsync()
        {
            using var bodyStream = new StreamReader(this.Request.Body);
            var clientToken = await bodyStream.ReadToEndAsync();
            var jwtToken = new JsonWebToken(clientToken);
            var tenantId = jwtToken.GetPayloadValue<string>("tid");
            var httpRequestUri = $"https://login.microsoft.com/{tenantId}/oauth2/v2.0/token";
            var httpRequestMessage = new HttpRequestMessage(HttpMethod.Post, httpRequestUri)
            {
                Content = new FormUrlEncodedContent(new Dictionary<string, string>()
                {
                    ["grant_type"] = "urn:ietf:params:oauth:grant-type:jwt-bearer",
                    ["client_id"] = this.authClientId,
                    ["client_secret"] = this.authClientSecret,
                    ["assertion"] = clientToken,
                    ["scope"] = this.authScope,
                    ["requested_token_use"] = "on_behalf_of",
                })
            };
            var httpResponseMessage = await this.httpClient.SendAsync(httpRequestMessage);
            var httpResponseContent = await httpResponseMessage.Content.ReadAsStringAsync();
            var httpResponseJson = JsonSerializer.Deserialize<Dictionary<string, object>>(httpResponseContent);
            if (httpResponseMessage.IsSuccessStatusCode)
            {
                var serverToken = httpResponseJson["access_token"].ToString();
                return this.Ok(serverToken);
            }
            else
            {
                var errorCode = httpResponseJson["error"].ToString();
                var errorDescription = httpResponseJson["error_description"].ToString();
                if (errorCode == "invalid_grant" || errorCode == "interaction_required")
                {
                    return this.StatusCode((int)HttpStatusCode.Forbidden, errorDescription);
                }
                else
                {
                    return this.StatusCode((int)HttpStatusCode.InternalServerError, errorDescription);
                }
            }
        }

    }

}
