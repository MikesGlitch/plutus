namespace Plutus.Models
{
    public class RetirementPlanMainInputs
    {
        public double AnnualReturnMinRisk { get; set; }

        public double AnnualReturnEquitiesRisk { get; set; }

        public double InflationReturnMinRisk { get; set; }

        public double InflationEquities { get; set; }

        public double ReturnAfterInflationCAGRReturnMinRisk { get; set; }

        public double ReturnAfterInflationCAGREquities { get; set; }

        public double ReturnAfterInflationAnnualAverageMinRisk { get; set; }

        public double ReturnAfterInflationAnnualAverageEquities { get; set; }

        public double StandardDeviationMinRisk { get; set; }

        public double StandardDeviationEquities { get; set; }

        public double GrowthInAnnualContribution { get; set; }
    }
}
