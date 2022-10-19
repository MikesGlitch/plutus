using MathNet.Numerics.Distributions;
using Plutus.Models;
using System;
using System.Collections.Generic;
using System.Text.Json;

namespace Plutus.Application
{
    public class RetirementPlanService
    {
        public RetirementPlan GetRetirementPlan()
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
                GrowthInAnnualContribution = 0, // not relevant for me
                CurrentAmount = 216385.01M,
                CurrentTotalContributions = 170211.24M,
                ThisYearsContributions = 30000M,
                MinRiskAllocation = 0,
                CurrentAge = 30,
                DeathAge = 90
            };

            var retirementPlan = new RetirementPlan(inputs);
            return retirementPlan;
        }
    }

    public class RetirementPlan
    {
        public RetirementPlan(RetirementPlanMainInputs inputs)
        {
            var yearCount = 0;
            var currentAmount = inputs.CurrentAmount;

            for (var year = inputs.CurrentAge; year <= inputs.DeathAge; year++)
            {
                var thisYear = new Year(year, yearCount, currentAmount, inputs);
                Years.Add(thisYear);

                // setup next year
                yearCount++;
                currentAmount = thisYear.EndOfYearAmount;
            }
        }

        public List<Year> Years { get; set; } = new List<Year>();

        public class Year
        {
            public Year(int age, int yearCount, decimal priorYearAmount, RetirementPlanMainInputs inputs)
            {
                Age = age;
                YearCount = yearCount;
                PriorYearAmount = priorYearAmount;
                AnnualContributions = inputs.ThisYearsContributions;

                // Calculated
                StartOfYearAmount = PriorYearAmount + AnnualContributions;
                MinRiskAllocationPercent = inputs.MinRiskAllocation;
                MinRiskAllocationAmount = StartOfYearAmount * (inputs.MinRiskAllocation / 100);
                EquityRiskAllocationPercent = 100M - inputs.MinRiskAllocation;
                EquityRiskAllocationAmount = StartOfYearAmount * (EquityRiskAllocationPercent/100);
                TotalContribution = inputs.CurrentTotalContributions + AnnualContributions;
                MinRiskReturn = inputs.ReturnAfterInflationAnnualAverageMinRisk;
                EquityRiskReturn = GetEquityReturnPercentage(inputs.ReturnAfterInflationAnnualAverageEquities, inputs.StandardDeviationEquities);
                InvestmentReturn = (MinRiskAllocationAmount * (decimal)MinRiskReturn) + (EquityRiskAllocationAmount * ((decimal)EquityRiskReturn/100));
                EndOfYearAmount = StartOfYearAmount + InvestmentReturn;
            }

            private double GetEquityReturnPercentage(double returnAfterInflationAnnualAverageEquities, double standardDeviationEquities)
            {
                var normal = new Normal(returnAfterInflationAnnualAverageEquities, standardDeviationEquities);
                var equityReturnPercentage = normal.InverseCumulativeDistribution(new Random().NextDouble());
                return equityReturnPercentage;
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
