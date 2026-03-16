import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { MonthlyHistory } from '../../models/wealth-growth.model';

@Component({
  selector: 'app-wealth-growth-mini-chart',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './wealth-growth-mini-chart.component.html',
  styleUrls: ['./wealth-growth-mini-chart.component.scss']
})
export class WealthGrowthMiniChartComponent implements OnChanges {
  @Input() history: MonthlyHistory[] = [];
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  public chartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Seu Patrimônio',
        borderColor: '#10b981', // Verde esmeralda (estilo financeiro)
        backgroundColor: 'rgba(16, 185, 129, 0.1)', // Fundo translúcido
        fill: true,
        tension: 0.4, // Suaviza a curva
        pointRadius: 0, // Esconde as bolinhas para ficar clean
        borderWidth: 2
      },
      {
        data: [],
        label: 'Poupança',
        borderColor: '#94a3b8', // Cinza neutro
        borderDash: [5, 5], // Linha tracejada
        fill: false,
        tension: 0.4,
        pointRadius: 0,
        borderWidth: 1.5
      }
    ]
  };

  public chartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false }, // Esconde legenda
      tooltip: { enabled: false } // Esconde o tooltip para instigar o clique no botão
    },
    scales: {
      x: { display: false }, // Esconde eixo X
      y: { display: false }  // Esconde eixo Y
    },
    interaction: {
      intersect: false,
      mode: 'index',
    },
  };

  ngOnChanges(changes: SimpleChanges): void {
    // Quando o array history chegar ou mudar, nós atualizamos o gráfico
    if (changes['history'] && this.history.length > 0) {
      this.updateChart();
    }
  }

  private updateChart() {
    this.chartData.labels = this.history.map(h => `Mês ${h.month}`);
    this.chartData.datasets[0].data = this.history.map(h => h.compoundValue);
    this.chartData.datasets[1].data = this.history.map(h => h.savingsValue);

    // Manda o Chart.js renderizar o canvas novamente
    this.chart?.update();
  }
}