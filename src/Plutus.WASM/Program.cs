using FluentMigrator.Runner;
using MediatR;
using Microsoft.AspNetCore.Components.Web;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;
using People;
using Plutus.Data;
using Plutus.Migrations;
using Plutus.WASM;

var builder = WebAssemblyHostBuilder.CreateDefault(args);
builder.RootComponents.Add<App>("#app");
builder.RootComponents.Add<HeadOutlet>("head::after");


string dbPath = $"Data Source={FileAccessHelper.GetLocalFilePath("test.db3")}";
builder.Services
    .AddLogging() // what does this do?
    .AddFluentMigratorCore()
    .ConfigureRunner(
            builder => builder
                .AddSQLite()
                .WithGlobalConnectionString(dbPath)
                .ScanIn(typeof(AddUserTable).Assembly).For.All())
        .BuildServiceProvider();



builder.Services.AddSingleton<IPlutusDb>(s => ActivatorUtilities.CreateInstance<PlutusDb>(s, dbPath));
builder.Services.AddMediatR(typeof(AddNewUser).Assembly);

builder.Services.AddScoped(sp => new HttpClient { BaseAddress = new Uri(builder.HostEnvironment.BaseAddress) });

await builder.Build().RunAsync();

//namespace Plutus;

//public static class Program
//{
//    public static MauiApp CreateMauiApp()
//    {
//        var builder = MauiApp.CreateBuilder();
//        builder.UseMauiApp<App>();

//        string dbPath = $"Data Source={FileAccessHelper.GetLocalFilePath("test.db3")}";
//        builder.Services
//            .AddLogging() // what does this do?
//            .AddFluentMigratorCore()
//            .ConfigureRunner(
//                    builder => builder
//                        .AddSQLite()
//                        .WithGlobalConnectionString(dbPath)
//                        .ScanIn(typeof(AddUserTable).Assembly).For.All())
//                .BuildServiceProvider();

//        builder.Services.AddMauiBlazorWebView();

//#if DEBUG
//        builder.Services.AddBlazorWebViewDeveloperTools();
//#endif

//        builder.Services.AddSingleton<IPlutusDb>(s => ActivatorUtilities.CreateInstance<PlutusDb>(s, dbPath));
//        builder.Services.AddMediatR(typeof(AddNewUser).Assembly);

//        return builder.Build();
//    }
//}
