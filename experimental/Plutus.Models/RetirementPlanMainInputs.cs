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

        public decimal CurrentAmount { get; set; } = 216385.01M;

        public decimal CurrentTotalContributions { get; set; } = 170211.24M;

        public decimal ThisYearsContributions { get; set; } = 30000M;

        public decimal MinRiskAllocation { get; set; } = 0;

        public int CurrentAge { get; set; } = 30;

        public int DeathAge { get; set; } = 90;
    }
}
