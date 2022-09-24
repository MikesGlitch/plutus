using FluentMigrator.Runner;

namespace Plutus;

public partial class App : Application
{
    public App(IMigrationRunner migrationRunner)
	{
        migrationRunner.MigrateUp();

        InitializeComponent();

		MainPage = new MainPage();
    }
}
