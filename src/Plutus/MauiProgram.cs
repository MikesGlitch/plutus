using FluentMigrator.Runner;
using MediatR;
using People;
using Plutus.Data;
using Plutus.Migrations;

namespace Plutus;

public static class MauiProgram
{
	public static MauiApp CreateMauiApp()
	{
		var builder = MauiApp.CreateBuilder();
		builder.UseMauiApp<App>();

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

        builder.Services.AddMauiBlazorWebView();

#if DEBUG
		builder.Services.AddBlazorWebViewDeveloperTools();
#endif

		builder.Services.AddSingleton<IPlutusDb>(s => ActivatorUtilities.CreateInstance<PlutusDb>(s, dbPath));
        builder.Services.AddMediatR(typeof(AddNewUser).Assembly);

        return builder.Build();
	}
}
