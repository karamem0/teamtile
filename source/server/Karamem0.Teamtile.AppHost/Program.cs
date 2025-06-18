var builder = DistributedApplication.CreateBuilder(args);

var server = builder.AddProject("server", "../Karamem0.Teamtile/Karamem0.Teamtile.csproj");
var client = builder
    .AddViteApp(
        "client",
        "../../client",
        useHttps: true
    )
    .WithNpmPackageInstallation()
    .WithExternalHttpEndpoints()
    .WithReference(server)
    .WaitFor(server);

var app = builder.Build();

await app.RunAsync();
