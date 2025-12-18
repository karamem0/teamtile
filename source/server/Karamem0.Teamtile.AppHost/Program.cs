//
// Copyright (c) 2021-2025 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

using Aspire.Hosting;

var builder = DistributedApplication.CreateBuilder(args);

var microsoftIdentityClientId = builder.AddParameter("MicrosoftIdentityClientId");
var microsoftIdentityClientSecret = builder.AddParameter("MicrosoftIdentityClientSecret");
var microsoftIdentityTenantId = builder.AddParameter("MicrosoftIdentityTenantId");

_ = builder
    .AddProject<Projects.Karamem0_Teamtile_Web>("server")
    .WithEnvironment("MicrosoftIdentity:ClientId", microsoftIdentityClientId)
    .WithEnvironment("MicrosoftIdentity:ClientSecret", microsoftIdentityClientSecret)
    .WithEnvironment("MicrosoftIdentity:TenantId", microsoftIdentityTenantId);

var app = builder.Build();

await app.RunAsync();
