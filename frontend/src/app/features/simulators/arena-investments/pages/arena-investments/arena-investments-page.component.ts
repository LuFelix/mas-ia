import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { ArenaInvestmentsFormComponent } from '../../components/arena-investments-form/arena-investments-form.component';
import { ArenaInvestmentsService } from '../../services/arena-investments.service';
import { ArenaInvestmentRequest, ArenaInvestmentResponse } from '../../models/arena-investments.model';
import { ArenaInvestmentsResultComponent } from '../../components/arena-investments-result/arena-investments-result.component';
// Quando criarmos o Result Card bonitão, importaremos ele aqui!

@Component({
  selector: 'app-arena-investments-page',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    ArenaInvestmentsFormComponent,
    ArenaInvestmentsResultComponent
  ],
  templateUrl: './arena-investments-page.component.html',
  styleUrls: ['./arena-investments-page.component.scss']
})
export class ArenaInvestmentsPageComponent {
  
  simulationResult: ArenaInvestmentResponse | null = null;
  isLoading = false;

  constructor(private arenaService: ArenaInvestmentsService) {}

  // Esse método é disparado quando o formulário emite o evento (simulate)
  onSimulate(request: ArenaInvestmentRequest) {
    this.isLoading = true;
    this.simulationResult = null; // Reseta o resultado anterior, se houver

    this.arenaService.simulate(request).subscribe({
      next: (response) => {
        this.simulationResult = response;
        this.isLoading = false;
        console.log('Resultado da Batalha (MOCK):', this.simulationResult);
      },
      error: (err) => {
        console.error('Erro na simulação', err);
        this.isLoading = false;
      }
    });
  }
}