# Plano: Arena de Investimentos

## 1. Modelagem de Dados (Interfaces)

```typescript
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

## 2. Estrutura de Pastas e Arquivos
src/app/features/simulators/arena-investments/
├── arena-investments-page/ (componente principal)
├── components/
│   ├── arena-investments-form/
│   ├── arena-investments-result/
│   ├── arena-investments-mini-chart/
│   └── arena-investments-detailed-modal/
└── services/
    └── arena-investments.service.ts

---