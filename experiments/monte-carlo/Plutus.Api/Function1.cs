using System.Net;
using System.Threading.Tasks;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.Extensions.Logging;

using Plutus.Application;

namespace Plutus.Api
{
    public class Function1
    {
        private readonly ILogger _logger;

        public Function1(ILoggerFactory loggerFactory)
        {
            _logger = loggerFactory.CreateLogger<Function1>();
        }

        [Function("Function1")]
        public async Task<HttpResponseData> Run([HttpTrigger(AuthorizationLevel.Function, "get")] HttpRequestData req)
        {
            var retirementService = new RetirementPlanService();
            var retirementPlan = retirementService.GetRetirementPlan();

            var response = req.CreateResponse(HttpStatusCode.OK);
            await response.WriteAsJsonAsync(retirementPlan);
            return response;
        }
    }
}
