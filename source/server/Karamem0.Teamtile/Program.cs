//
// Copyright (c) 2021-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

#pragma warning disable CA1852

using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Identity.Web;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

var builder = WebApplication.CreateBuilder(args);

var configuration = builder.Configuration;
var services = builder.Services;
_ = services.AddMicrosoftIdentityWebApiAuthentication(configuration, "AzureAD");
_ = services.AddApplicationInsightsTelemetry();
_ = services.AddControllers();
_ = services.AddHttpClient();
_ = services.AddCors(options =>
    options.AddDefaultPolicy(builder => builder
        .AllowAnyOrigin()
        .AllowAnyHeader()
        .AllowAnyMethod()));

var app = builder.Build();
if (app.Environment.IsDevelopment())
{
    _ = app.UseDeveloperExceptionPage();
    _ = app.UseCors();
}
_ = app.UseHttpsRedirection();
_ = app.UseHsts();
_ = app.UseDefaultFiles();
_ = app.UseStaticFiles();
_ = app.UseRouting();
_ = app.UseAuthentication();
_ = app.UseAuthorization();
_ = app.MapControllers();
_ = app.MapFallbackToFile("/index.html");

await app.RunAsync();

#pragma warning restore CA1852
