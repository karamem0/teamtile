//
// Copyright (c) 2021-2026 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

#pragma warning disable IDE0053

using Karamem0.Teamtile;
using Karamem0.Teamtile.Controllers;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Identity.Web;

var builder = WebApplication.CreateBuilder(args);

_ = builder.WebHost.ConfigureKestrel(options =>
{
    options.AddServerHeader = false;
});

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
_ = app.Use(async (context, next) =>
{
    var headers = context.Response.Headers;
    headers.ContentSecurityPolicy = "default-src 'self'; connect-src 'self' *.azure.com *.microsoft.com *.office.net; frame-ancestors 'self' *.cloud.microsoft *.microsoft365.com *.office.com teams.microsoft.com; img-src 'self' blob: data:; style-src 'self' 'unsafe-inline'";
    headers.XContentTypeOptions = "nosniff";
    headers.XFrameOptions = "ALLOW-FROM https://teams.microsoft.com/";
    headers["Permissions-Policy"] = "camera=(), fullscreen=(), geolocation=(), microphone=()";
    headers["Referrer-Policy"] = "same-origin";
    await next();
});

var api = app
    .MapGroup("/api")
    .RequireAuthorization();

_ = api.MapPost("/token", TokenController.PostAsync);

await app.RunAsync();

#pragma warning restore IDE0053
