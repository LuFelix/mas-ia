// Caminho: src/app/features/simulators/wealth-growth/components/wealth-growth-result/wealth-growth-result.component.ts

import { Component, Input } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button'; 

import { WealthGrowthSimulationResponse } from '../../models/wealth-growth.model';
import { WealthGrowthMiniChartComponent } from '../wealth-growth-mini-chart/wealth-growth-mini-chart.component';

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
    WealthGrowthMiniChartComponent,
  ],
  templateUrl: './wealth-growth-result.component.html',
  styleUrls: ['./wealth-growth-result.component.scss'],
})
export class WealthGrowthResultComponent {
  // Input aceita a resposta completa da API (incluindo o histórico)
  @Input() resultData: WealthGrowthSimulationResponse | null = null;

  get earnings(): number {
    if (!this.resultData) return 0;
    return this.resultData.totalWithInterest - this.resultData.totalInvested;
  }
}
