import { Component, Input } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button'; 
import { MatDialogModule, MatDialog } from '@angular/material/dialog'; // Importamos os dois!

import { WealthGrowthSimulationResponse } from '../../models/wealth-growth.model';
import { WealthGrowthMiniChartComponent } from '../wealth-growth-mini-chart/wealth-growth-mini-chart.component';
// Importamos o componente da modal APENAS para referência no .open()
import { WealthGrowthDetailedModalComponent } from '../wealth-growth-detailed-modal/wealth-growth-detailed-modal.component';

@Component({
  selector: 'app-wealth-growth-result',
  standalone: true,
  imports: [
    CommonModule,
    CurrencyPipe,
    MatCardModule,
    MatDividerModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule, // O módulo vai aqui
    WealthGrowthMiniChartComponent
    // REMOVEMOS a modal daqui!
  ],
  templateUrl: './wealth-growth-result.component.html',
  styleUrls: ['./wealth-growth-result.component.scss'],
})
export class WealthGrowthResultComponent {
  // Injetamos o SERVIÇO (MatDialog) e não o Módulo
  constructor(private dialog: MatDialog) {}

  @Input() resultData: WealthGrowthSimulationResponse | null = null;

  get earnings(): number {
    if (!this.resultData) return 0;
    return this.resultData.totalWithInterest - this.resultData.totalInvested;
  }

  openDetailedAnalysis() {
    if (!this.resultData) {
      console.error('Erro: resultData está vazio!');
      return;
    }

    this.dialog.open(WealthGrowthDetailedModalComponent, {
      width: '1200px',
      height: '85vh',
      maxWidth: '95vw',
      maxHeight: '90vh',
      data: this.resultData
    });
  }
}