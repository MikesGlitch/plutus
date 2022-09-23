using FluentMigrator.Builders.Create.Table;

namespace Plutus.Migrations
{
    internal static class MigrationExtensions
    {
        public static ICreateTableColumnOptionOrWithColumnSyntax WithIdColumn(this ICreateTableWithColumnSyntax tableWithColumnSyntax)
        {
            return tableWithColumnSyntax
                .WithColumn("Id")
                .AsInt32()
                .NotNullable()
                .PrimaryKey()
                .Identity();
        }

        public static ICreateTableColumnOptionOrWithColumnSyntax WithCreatedAndModifiedAt(this ICreateTableWithColumnSyntax tableWithColumnSyntax)
        {
            return tableWithColumnSyntax
                .WithColumn("CreatedAtUtc").AsDateTime().NotNullable()
                .WithColumn("ModifiedAtUtc").AsDateTime().NotNullable();
        }
    }
}