import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { BaseChartDirective } from 'ng2-charts';
import { ChartData, ChartOptions } from 'chart.js';
import { ArenaInvestmentResponse } from '../../models/arena-investments.model';

@Component({
  selector: 'app-arena-investments-detailed-modal',
  standalone: true,
  imports: [CommonModule, MatDialogModule, BaseChartDirective],
  templateUrl: './arena-investments-detailed-modal.html',
  styleUrl: './arena-investments-detailed-modal.scss'
})
export class ArenaInvestmentsDetailedModalComponent {
  public lineChartData: ChartData<'line'>;
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' }
    }
  };

  constructor(@Inject(MAT_DIALOG_DATA) public data: ArenaInvestmentResponse) {
    const conservador = this.data.perfis.find((p) => p.nome === 'Conservador');
    const moderado = this.data.perfis.find((p) => p.nome === 'Moderado');
    const arrojado = this.data.perfis.find((p) => p.nome === 'Arrojado');

    const baseHistorico =
      conservador?.historico ??
      moderado?.historico ??
      arrojado?.historico ??
      [];

    this.lineChartData = {
      labels: baseHistorico.map((ponto) => `Mês ${ponto.mes}`),
      datasets: [
        {
          label: 'Conservador',
          data: conservador?.historico.map((ponto) => ponto.saldo) ?? [],
          borderColor: '#4caf50',
          backgroundColor: 'rgba(76, 175, 80, 0.15)',
          tension: 0.3
        },
        {
          label: 'Moderado',
          data: moderado?.historico.map((ponto) => ponto.saldo) ?? [],
          borderColor: '#ff9800',
          backgroundColor: 'rgba(255, 152, 0, 0.15)',
          tension: 0.3
        },
        {
          label: 'Arrojado',
          data: arrojado?.historico.map((ponto) => ponto.saldo) ?? [],
          borderColor: '#f44336',
          backgroundColor: 'rgba(244, 67, 54, 0.15)',
          tension: 0.3
        }
      ]
    };
  }

}
