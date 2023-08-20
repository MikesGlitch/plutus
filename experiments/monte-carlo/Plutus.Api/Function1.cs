using System.Net;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;

using Plutus.Application;

namespace Plutus.Api
{
    public class Function1
    {
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
