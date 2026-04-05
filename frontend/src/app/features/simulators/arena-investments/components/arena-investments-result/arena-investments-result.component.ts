import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';

import { ArenaInvestmentResponse, ArenaInvestmentProfile } from '../../models/arena-investments.model';
import { ArenaInvestmentsMiniChartComponent } from '../arena-investments-mini-chart/arena-investments-mini-chart.component';
import { ArenaInvestmentsDetailedModalComponent } from '../arena-investments-detailed-modal/arena-investments-detailed-modal';

@Component({
  selector: 'app-arena-investments-result',
  standalone: true,
  imports: [
    CommonModule, 
    MatCardModule, 
    MatButtonModule, 
    MatIconModule, 
    ArenaInvestmentsMiniChartComponent
  ],
  templateUrl: './arena-investments-result.component.html',
  styleUrls: ['./arena-investments-result.component.scss']
})
export class ArenaInvestmentsResultComponent {
  @Input() resultData!: ArenaInvestmentResponse;

  constructor(private dialog: MatDialog) {}

  // Lógica para achar quem terminou com o maior saldo
  get winner(): ArenaInvestmentProfile | null {
    if (!this.resultData || !this.resultData.perfis.length) return null;
    return this.resultData.perfis.reduce((prev, current) => 
      (prev.saldoFinal > current.saldoFinal) ? prev : current
    );
  }

  openDetailedModal() {
    this.dialog.open(ArenaInvestmentsDetailedModalComponent, {
      width: '90vw',
      maxWidth: '1000px',
      data: this.resultData
    });
  }
}