namespace People
{
    public class FileAccessHelper
    {
        public static string GetLocalFilePath(string filename)
        {
#if DEBUG
            string testDataDirectory = "D:\\Google Drive\\Plutus\\";
            return Path.Combine(testDataDirectory, filename);
#else
            return Path.Combine(FileSystem.AppDataDirectory, filename);
#endif
        }
    }
}