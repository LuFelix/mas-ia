import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { WealthGrowthFormComponent, WealthGrowthFormData } from '../../components/wealth-growth-form/wealth-growth-form.component';
import { WealthGrowthResultComponent } from '../../components/wealth-growth-result/wealth-growth-result.component';
import { WealthGrowthService } from '../../services/wealth-growth.service';

import { WealthGrowthSimulationResponse } from '../../models/wealth-growth.model';

@Component({
  selector: 'app-wealth-growth-page',
  standalone: true,
  imports: [
    CommonModule,
    WealthGrowthFormComponent,
    WealthGrowthResultComponent,
  ],
  templateUrl: './wealth-growth-page.component.html',
  styleUrls: ['./wealth-growth-page.component.scss'],
})
export class WealthGrowthPageComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private wealthGrowthService = inject(WealthGrowthService);

  public activityId: string | null = null;
  public resultData: WealthGrowthSimulationResponse | null = null;
  public isLoading = false;
  public errorMessage: string | null = null;

  ngOnInit(): void {
    this.activityId = this.route.snapshot.paramMap.get('id');
  }

  /**
   * Recebe os dados do formulário e envia para o Motor de Matemática (Backend NestJS)
   */
  onSimulate(data: WealthGrowthFormData): void {
    this.isLoading = true;
    this.errorMessage = null;

    const requestPayload = {
      initialCapital: data.initialCapital,
      monthlyContribution: data.monthlyContribution,
      interestRate: data.interestRate,
      periodMonths: data.months,
    };

    this.wealthGrowthService.calculateProjection(requestPayload).subscribe({
      next: (response) => {
        this.resultData = response;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erro na API do Simulador:', err);
        this.errorMessage = 'Não foi possível calcular a simulação agora. Tente novamente em instantes.';
        this.resultData = null;
        this.isLoading = false;
      },
    });
  }
}