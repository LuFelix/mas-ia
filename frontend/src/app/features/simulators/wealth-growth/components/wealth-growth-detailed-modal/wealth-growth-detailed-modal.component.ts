import { Component, Inject, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartOptions } from 'chart.js';

//Interface do model
import { MonthlyHistory } from '../../models/wealth-growth.model'; 

@Component({
  selector: 'app-wealth-growth-detailed-modal',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatTableModule,
    MatPaginatorModule,
    BaseChartDirective
  ],
  templateUrl: './wealth-growth-detailed-modal.component.html',
  styleUrls: ['./wealth-growth-detailed-modal.component.scss']
})
export class WealthGrowthDetailedModalComponent implements AfterViewInit {
  // Configurações da Tabela
  displayedColumns: string[] = ['month', 'invested', 'savingsValue', 'compoundValue'];
  dataSource: MatTableDataSource<MonthlyHistory>;
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  // Configurações do Gráfico
  public lineChartData: ChartConfiguration<'line'>['data'];
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' },
      tooltip: {
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) { label += ': '; }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(context.parsed.y);
            }
            return label;
          }
        }
      }
    },
    scales: {
      y: {
        ticks: {
          callback: function(value) {
            return 'R$ ' + value; // Prefixo simples no eixo Y
          }
        }
      }
    }
  };

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    // Alimenta a tabela
    this.dataSource = new MatTableDataSource(this.data.history);

    // Alimenta o gráfico
    const labels = this.data.history.map((h: MonthlyHistory) => `Mês ${h.month}`);
    const investedData = this.data.history.map((h: MonthlyHistory) => h.invested);
    const savingsData = this.data.history.map((h: MonthlyHistory) => h.savingsValue);
    const compoundData = this.data.history.map((h: MonthlyHistory) => h.compoundValue);

    this.lineChartData = {
      labels: labels,
      datasets: [
        {
          data: investedData,
          label: 'Valor Investido',
          borderColor: '#9e9e9e', // Cinza neutro
          backgroundColor: 'rgba(158, 158, 158, 0.2)',
          borderDash: [5, 5],
          fill: true,
          tension: 0.4
        },
        {
          data: savingsData,
          label: 'Poupança (0,5% a.m.)',
          borderColor: '#f44336', // Vermelho/Alerta
          backgroundColor: 'transparent',
          tension: 0.4
        },
        {
          data: compoundData,
          label: 'Juros Compostos (Seu Patrimônio)',
          borderColor: '#005cbb', // Azure Blue (Paleta Principal)
          backgroundColor: 'rgba(0, 92, 187, 0.1)',
          fill: true,
          tension: 0.4
        }
      ]
    };
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}