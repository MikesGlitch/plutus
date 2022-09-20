using Microsoft.Data.Sqlite;
using System.Data;

namespace Plutus.Data
{
    public interface IPlutusDb
    {
        IDbConnection Connection { get; set; }
    }

    public class PlutusDb : IPlutusDb, IDisposable
    {
        public PlutusDb(string dbFilename)
        {
            Connection = new SqliteConnection(dbFilename);
        }

        public IDbConnection Connection { get; set; }

        public void Dispose()
        {
            if (Connection != null)
            {
                Connection.Dispose();
            }
        }
    }
}