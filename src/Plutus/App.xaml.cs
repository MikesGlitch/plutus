using FluentMigrator.Runner;
using System.Text;

namespace Plutus;

public partial class App : Application
{
    public App(IMigrationRunner migrationRunner)
	{
        // Run the migrations
        migrationRunner.MigrateUp();

        InitializeComponent();

		MainPage = new MainPage();
    }
}
