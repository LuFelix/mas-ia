import { Injectable } from '@nestjs/common';
// Lembre-se de ajustar o caminho do DTO se necessário
import { SimulateWealthGrowthDto } from './dto/simulate-wealth-growth.dto';

// 1. Ensinamos ao TypeScript qual é a "cara" de cada mês da simulação
export interface MonthlyHistoryItem {
  month: number;
  invested: number;
  compoundValue: number;
  savingsValue: number;
}

@Injectable()
export class WealthGrowthService {
  calculate(dto: SimulateWealthGrowthDto) {
    const { initialCapital, monthlyContribution, interestRate, periodMonths } = dto;

    const i = interestRate / 100;
    const savingsRate = 0.005; 

    let currentCompoundValue = initialCapital;
    let currentSavingsValue = initialCapital;
    let currentInvested = initialCapital;

    // 2. MÁGICA AQUI: Dizemos que o array vai receber itens desse tipo (e não mais "never")
    const monthlyHistory: MonthlyHistoryItem[] = [];

    // Mês 0
    monthlyHistory.push({
      month: 0,
      invested: Number(currentInvested.toFixed(2)),
      compoundValue: Number(currentCompoundValue.toFixed(2)),
      savingsValue: Number(currentSavingsValue.toFixed(2)),
    });

    // Loop de meses
    for (let month = 1; month <= periodMonths; month++) {
      currentCompoundValue = (currentCompoundValue * (1 + i)) + monthlyContribution;
      currentSavingsValue = (currentSavingsValue * (1 + savingsRate)) + monthlyContribution;
      currentInvested += monthlyContribution;

      monthlyHistory.push({
        month,
        invested: Number(currentInvested.toFixed(2)),
        compoundValue: Number(currentCompoundValue.toFixed(2)),
        savingsValue: Number(currentSavingsValue.toFixed(2)),
      });
    }

    const totalInterestEarned = currentCompoundValue - currentInvested;

    return {
      totalInvested: Number(currentInvested.toFixed(2)),
      totalWithInterest: Number(currentCompoundValue.toFixed(2)),
      totalInterestEarned: Number(totalInterestEarned.toFixed(2)),
      history: monthlyHistory, 
    };
  }
}