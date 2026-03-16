//src/app/features/simulators/wealth-growth/models/

export interface WealthGrowthSimulationRequest {
  initialCapital: number;
  monthlyContribution: number;
  interestRate: number;
  periodMonths: number;
}

export interface MonthlyHistory {
  month: number;
  invested: number;
  compoundValue: number;
  savingsValue: number;
}

export interface WealthGrowthSimulationResponse {
  totalInvested: number;
  totalWithInterest: number;
  totalInterestEarned: number;
  history: MonthlyHistory[];
}