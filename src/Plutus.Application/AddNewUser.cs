using Dapper;
using MediatR;

namespace Plutus.Data
{
    public class AddNewUser: IRequestHandler<AddNewUser.Request, Unit>
    {
        private IPlutusDb _plutusDb;

        public AddNewUser(IPlutusDb plutusDb)
        {
            _plutusDb = plutusDb;
        }

        public async Task<Unit> Handle(Request request, CancellationToken cancellationToken)
        {
            try
            {
                // basic validation to ensure a name was entered
                if (string.IsNullOrEmpty(request.FirstName) && string.IsNullOrEmpty(request.LastName))
                    throw new Exception("Valid name required");

                await _plutusDb.Connection.ExecuteAsync($"INSERT INTO USER (FirstName, LastName) VALUES ('{request.FirstName}', '{request.LastName}')");
                Console.WriteLine("Inserted");
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
            }

            return Unit.Value;
        }

        public class Request: IRequest<Unit>
        {
            public string FirstName { get; set; }

            public string LastName { get; set; }
        }
    }
}
