import { Injectable } from '@nestjs/common';
import { SimulateArenaInvestmentsDto } from './dto/simulate-arena-investments.dto';

type ArenaProfileName = 'Conservador' | 'Moderado' | 'Arrojado';

interface ArenaProfileConfig {
  nome: ArenaProfileName;
  taxaMensal: number;
}

export interface ArenaProfileHistoryPoint {
  mes: number;
  saldo: number;
  rendimento: number;
}

export interface ArenaInvestmentProfileResult {
  nome: ArenaProfileName;
  taxaMensal: number;
  saldoFinal: number;
  historico: ArenaProfileHistoryPoint[];
}

export interface ArenaInvestmentsSimulationResponse {
  perfis: ArenaInvestmentProfileResult[];
}

@Injectable()
export class ArenaInvestmentsService {
  private readonly profiles: ArenaProfileConfig[] = [
    { nome: 'Conservador', taxaMensal: 0.008 },
    { nome: 'Moderado', taxaMensal: 0.01 },
    { nome: 'Arrojado', taxaMensal: 0.015 },
  ];

  simulate(dto: SimulateArenaInvestmentsDto): ArenaInvestmentsSimulationResponse {
    const { initialCapital, monthlyContribution, periodMonths } = dto;

    const perfis: ArenaInvestmentProfileResult[] = this.profiles.map((profile) => {
      let saldoAtual = initialCapital;
      const historico: ArenaProfileHistoryPoint[] = [];

      for (let mes = 1; mes <= periodMonths; mes++) {
        const saldoAnterior = saldoAtual;
        saldoAtual = saldoAtual * (1 + profile.taxaMensal) + monthlyContribution;
        const rendimento = saldoAtual - saldoAnterior - monthlyContribution;

        historico.push({
          mes,
          saldo: Number(saldoAtual.toFixed(2)),
          rendimento: Number(rendimento.toFixed(2)),
        });
      }

      return {
        nome: profile.nome,
        taxaMensal: profile.taxaMensal,
        saldoFinal: Number(saldoAtual.toFixed(2)),
        historico,
      };
    });

    return { perfis };
  }
}
