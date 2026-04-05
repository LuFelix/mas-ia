import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData } from 'chart.js';
import { ArenaInvestmentProfile } from '../../models/arena-investments.model';

@Component({
  selector: 'app-arena-investments-mini-chart',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  // O template e o estilo são tão pequenos que deixei inline para facilitar!
  template: `
    <div class="chart-container">
      <canvas baseChart [data]="chartData" [options]="chartOptions" type="bar"></canvas>
    </div>
  `,
  styles: [`.chart-container { position: relative; height: 200px; width: 100%; }`]
})
export class ArenaInvestmentsMiniChartComponent implements OnChanges {
  @Input() perfis: ArenaInvestmentProfile[] = [];

  chartData: ChartData<'bar'> = { labels: [], datasets: [] };
  
  chartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true }
    },
    scales: {
      y: { beginAtZero: true, display: false } // Esconde o eixo Y para ficar limpo
    }
  };

  ngOnChanges() {
    if (this.perfis && this.perfis.length > 0) {
      this.chartData = {
        labels: this.perfis.map(p => p.nome),
        datasets: [
          {
            data: this.perfis.map(p => p.saldoFinal),
            backgroundColor: ['#4caf50', '#ff9800', '#f44336'], // Cores para Conservador, Moderado, Arrojado
            borderRadius: 4
          }
        ]
      };
    }
  }
}