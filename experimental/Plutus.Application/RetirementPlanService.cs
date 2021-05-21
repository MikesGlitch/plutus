using MathNet.Numerics.Distributions;
using Plutus.Models;
using System;
using System.Collections.Generic;
using System.Text.Json;

namespace Plutus.Application
{
    public class RetirementPlanService
    {
        public string GetRetirementPlan()
        {
            var inputs = new RetirementPlanMainInputs
            {
                AnnualReturnMinRisk = 2.5,
                AnnualReturnEquitiesRisk = 7,
                InflationReturnMinRisk = 2,
                InflationEquities = 2,
                ReturnAfterInflationCAGRReturnMinRisk = 0.5, // calculated
                ReturnAfterInflationAnnualAverageEquities = 5, // calculated
                ReturnAfterInflationAnnualAverageMinRisk = 0.5, // calculated
                ReturnAfterInflationCAGREquities = 6.07, // calculated
                StandardDeviationMinRisk = 0,
                StandardDeviationEquities = 15,
                GrowthInAnnualContribution = 0 // not relevant for me
            };

            var currentAge = 30;
            var deathAge = 90;

            var retirementPlan = new RetirementPlan();
            var yearCount = 0;
            var currentAmount = 216385.01M;
            var currentTotalContributions = 170211.24M;
            var thisYearsContributions = 30000;
            var minRiskAllocation = 0;

            for (var year = currentAge; year <= deathAge; year++) 
            {
                var thisYear = new RetirementPlan.Year(year, yearCount, currentAmount, thisYearsContributions, currentTotalContributions, minRiskAllocation, inputs);
                retirementPlan.Years.Add(thisYear);

                // setup next year
                yearCount++;
                currentAmount = thisYear.EndOfYearAmount;
            }

            return JsonSerializer.Serialize(retirementPlan, new JsonSerializerOptions { WriteIndented = true });
        }
    }

    public class RetirementPlan
    {
        public List<Year> Years { get; set; } = new List<Year>();

        public class Year
        {
            public Year(int age, int yearCount, decimal priorYearAmount, decimal annualContributions, decimal currentTotalContributions, decimal minRiskAllocationPercent, RetirementPlanMainInputs inputs)
            {
                Age = age;
                YearCount = yearCount;
                PriorYearAmount = priorYearAmount;
                AnnualContributions = annualContributions;

                // calculated
                StartOfYearAmount = PriorYearAmount + AnnualContributions;
                MinRiskAllocationPercent = minRiskAllocationPercent;
                MinRiskAllocationAmount = StartOfYearAmount * (minRiskAllocationPercent/100);
                EquityRiskAllocationPercent = 100M - MinRiskAllocationPercent;
                EquityRiskAllocationAmount = StartOfYearAmount * (EquityRiskAllocationPercent/100);
                TotalContribution = currentTotalContributions + AnnualContributions;
                MinRiskReturn = inputs.ReturnAfterInflationAnnualAverageMinRisk;

                var normal = new Normal(inputs.ReturnAfterInflationAnnualAverageEquities, inputs.StandardDeviationEquities);
                var equityReturnPercentage = normal.InverseCumulativeDistribution(new Random().NextDouble());
                EquityRiskReturn = equityReturnPercentage;
                InvestmentReturn = (MinRiskAllocationAmount * (decimal)MinRiskReturn) + (EquityRiskAllocationAmount * ((decimal)EquityRiskReturn/100));
                EndOfYearAmount = StartOfYearAmount + InvestmentReturn;
            }

            public int Age { get; private set; }

            public int YearCount { get; private set; }

            public decimal PriorYearAmount { get; private set; }

            public decimal AnnualContributions { get; private set; }

            public decimal StartOfYearAmount { get; private set; }

            public decimal InvestmentReturn { get; private set; }

            public decimal EndOfYearAmount { get; private set; }

            public decimal TotalContribution { get; private set; }

            public decimal MinRiskAllocationPercent { get; private set; }

            public decimal EquityRiskAllocationPercent { get; private set; }

            public decimal MinRiskAllocationAmount { get; private set; }

            public decimal EquityRiskAllocationAmount { get; private set; }

            public double MinRiskReturn { get; private set; }

            public double EquityRiskReturn { get; private set; }
        }
    }
}
