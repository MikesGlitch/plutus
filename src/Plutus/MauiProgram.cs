using MediatR;
using People;
using Plutus.Data;

namespace Plutus;

public static class MauiProgram
{
	public static MauiApp CreateMauiApp()
	{
		var builder = MauiApp.CreateBuilder();
		builder
			.UseMauiApp<App>()
			.ConfigureFonts(fonts =>
			{
				fonts.AddFont("OpenSans-Regular.ttf", "OpenSansRegular");
			});

		builder.Services.AddMauiBlazorWebView();

#if DEBUG
		builder.Services.AddBlazorWebViewDeveloperTools();
#endif

        string dbPath = $"Data Source={FileAccessHelper.GetLocalFilePath("test.db3")}";
		builder.Services.AddSingleton<IPlutusDb>(s => ActivatorUtilities.CreateInstance<PlutusDb>(s, dbPath));
        builder.Services.AddMediatR(typeof(AddNewUser).Assembly);

        // Make sure the migrations run on app startup - needs to be automatic so it runs when a user is up to date when they start the app

        return builder.Build();
	}
}
