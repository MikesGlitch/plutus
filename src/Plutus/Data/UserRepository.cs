using SQLite;

namespace Plutus.Data
{
    public class UserRepository
    {
        string _dbPath;

        public string StatusMessage { get; set; }

        private SQLiteConnection conn;

        public UserRepository(string dbPath)
        {
            _dbPath = dbPath;
        }

        private void Init()
        {
            if (conn != null)
                return;

            conn = new SQLiteConnection(_dbPath);
            conn.CreateTable<User>();
        }

        public void AddNewUser(string firstName, string lastName)
        {
            int result = 0;
            try
            {
                Init();

                // basic validation to ensure a name was entered
                if (string.IsNullOrEmpty(firstName) && string.IsNullOrEmpty(lastName))
                    throw new Exception("Valid name required");

                // TODO: Insert the new person into the database
                result = conn.Insert(new User { FirstName = firstName, LastName = lastName });
                result = 0;

                StatusMessage = string.Format("{0} record(s) added (Name: {1})", result, $"{firstName} {lastName}");
            }
            catch (Exception ex)
            {
                StatusMessage = string.Format("Failed to add {0}. Error: {1}", $"{firstName} {lastName}", ex.Message);
            }

        }

        public List<User> GetAllUsers()
        {
            try
            {
                Init();
                return conn.Table<User>().ToList();
            }
            catch (Exception ex)
            {
                StatusMessage = string.Format("Failed to retrieve data. {0}", ex.Message);
            }

            return new List<User>();
        }
    }
}
