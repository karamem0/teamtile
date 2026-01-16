//
// Copyright (c) 2021-2026 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

using Karamem0.Teamtile;
using Karamem0.Teamtile.Controllers;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Identity.Web;

var builder = WebApplication.CreateBuilder(args);

var configuration = builder.Configuration;
var services = builder.Services;
_ = services.Configure<MicrosoftIdentityOptions>(configuration.GetSection("MicrosoftIdentity"));
_ = services.AddMicrosoftIdentityWebApiAuthentication(configuration, "MicrosoftIdentity");
_ = services.AddApplicationInsightsTelemetry();
_ = services.AddServices();
_ = services.AddRepsitories();

var app = builder.Build();
if (app.Environment.IsDevelopment())
{
    _ = app.UseDeveloperExceptionPage();
}
_ = app.UseHttpsRedirection();
_ = app.UseHsts();
_ = app.UseStaticFiles();
_ = app.MapFallbackToFile("/index.html");

var api = app
    .MapGroup("/api")
    .RequireAuthorization();

_ = api.MapPost("/token", TokenController.PostAsync);

await app.RunAsync();
