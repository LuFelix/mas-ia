export interface ArenaInvestments {
}
export interface ArenaInvestmentRequest {
  valorInicial: number;
  aporteMensal: number;
  prazoMeses: number;
}

export interface ArenaProfileHistoryPoint {
  mes: number;
  saldo: number;
  rendimento: number;
}

export interface ArenaInvestmentProfile {
  nome: 'Conservador' | 'Moderado' | 'Arrojado';
  taxaMensal: number;
  saldoFinal: number;
  historico: ArenaProfileHistoryPoint[];
}

export interface ArenaInvestmentResponse {
  perfis: ArenaInvestmentProfile[];
}