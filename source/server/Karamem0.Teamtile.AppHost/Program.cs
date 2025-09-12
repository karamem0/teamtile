//
// Copyright (c) 2021-2025 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

using Aspire.Hosting;

#pragma warning disable IDE0059

var builder = DistributedApplication.CreateBuilder(args);

var server = builder.AddProject<Projects.Karamem0_Teamtile_Web>("server");

var app = builder.Build();

await app.RunAsync();

#pragma warning restore IDE0059
