using FluentMigrator;

namespace Plutus.Migrations
{
    [Migration(1)]
    public class AddUserTable : Migration
    {
        public override void Up()
        {
            Create.Table("User")
                .WithIdColumn()
                .WithColumn("FirstName").AsString().NotNullable()
                .WithColumn("LastName").AsString().NotNullable()
                .WithCreatedAndModifiedAt();
        }

        public override void Down()
        {
            Delete.Table("User");
        }
    }
}