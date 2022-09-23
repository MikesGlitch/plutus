namespace Plutus.Data
{
    public interface ICreatedAndModifiedAt
    {
        public DateTime CreatedAtUtc { get; set; }

        public DateTime ModifiedAtUtc { get; set; }
    }
}
