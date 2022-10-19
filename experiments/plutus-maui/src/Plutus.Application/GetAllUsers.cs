using Dapper;
using MediatR;

namespace Plutus.Data
{
    public class GetAllUsers : IRequestHandler<GetAllUsers.Request, IEnumerable<User>>
    {
        private IPlutusDb _plutusDb;

        public GetAllUsers(IPlutusDb plutusDb)
        {
            _plutusDb = plutusDb;
        }

        public async Task<IEnumerable<User>> Handle(Request request, CancellationToken cancellationToken)
        {
            try
            {
                return _plutusDb.Connection.Query<User>("SELECT * FROM USER");
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
            }

            return new List<User>();
        }

        public class Request : IRequest<IEnumerable<User>>
        {
        }
    }
}
