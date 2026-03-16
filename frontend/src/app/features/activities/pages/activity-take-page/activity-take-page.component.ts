// Caminho: src/app/features/activities/pages/activity-take-page/activity-take-page.component.ts

import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router'; 
import { MatIconModule } from '@angular/material/icon'; 
import { MatSnackBar } from '@angular/material/snack-bar';
import { EMPTY, Subscription, of } from 'rxjs';
import { catchError, finalize, take } from 'rxjs/operators';

import { LayoutService } from '../../../../core/services/layout.service';
import { ActivitiesService } from '../../services/activities.service';
import { CompleteActivity } from '../../../shared/models/activity.model';

// Os dois "Garçons" (Você criará estes arquivos no próximo passo)
import { ActivityTakeModernComponent } from '../../components/activity-take-modern/activity-take-modern.component';
import { ActivityTakeClassicComponent } from '../../components/activity-take-classic/activity-take-classic.component';

@Component({
  selector: 'app-activity-take-page',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule, 
    ActivityTakeModernComponent,
    ActivityTakeClassicComponent
  ],
  templateUrl: './activity-take-page.component.html',
  styleUrls: ['./activity-take-page.component.scss']
})
export class ActivityTakePageComponent implements OnInit, OnDestroy {
  
  public layoutService = inject(LayoutService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private activitiesService = inject(ActivitiesService);
  private snackBar = inject(MatSnackBar);

  // Estado
  public activity: CompleteActivity | null = null;
  public isLoading = true;
  public errorLoading = false;
  public activityId: string | null = null;
  public isDownloading = false;

  private loadSubscription: Subscription | null = null;

  ngOnInit(): void {
    this.activityId = this.route.snapshot.paramMap.get('id');
    if (!this.activityId) {
      this.errorLoading = true;
      this.isLoading = false;
      return; 
    }
    this.loadActivityDetails();
  }

  ngOnDestroy(): void {
    this.loadSubscription?.unsubscribe();
  }

  // A LÓGICA DE CARREGAMENTO (Simples, sem matrículas)
  loadActivityDetails(): void {
    this.isLoading = true;
    this.errorLoading = false;
    this.activity = null;
    
    this.loadSubscription = this.activitiesService.findActivityById(this.activityId!).pipe(
      take(1),
      catchError(err => {
        console.error('[ChefPage] Erro ao buscar atividade:', err);
        this.errorLoading = true;
        return of(null);
      }),
      finalize(() => {
        this.isLoading = false;
      })
    ).subscribe(activity => {
      if (!activity) {
        this.errorLoading = true;
        return; 
      }
      this.activity = activity;
    });
  }

  // Função que será repassada aos "Garçons" via @Output
  startActivity(): void {
    if (!this.activity) return;

    // Roteamento condicional baseado no tipo da atividade
    switch (this.activity.type) {
      case 'simulador':
        // Navega para o Simulador de Crescimento Patrimonial passando o ID da atividade
        this.router.navigate(['/app/activities/simulator/wealth-growth', this.activity.id]);
        break;
      case 'conversor':
        this.snackBar.open('Iniciando Conversor de Taxas...', 'Fechar', { duration: 2000 });
        break;
      case 'comparador':
        this.snackBar.open('Entrando na Arena de Investimentos...', 'Fechar', { duration: 2000 });
        break;
      default:
        this.snackBar.open('Tipo de ferramenta desconhecida.', 'Fechar', { duration: 2000 });
    }
  }

  downloadMaterial(): void {
    // Mesma lógica bloqueada do seu arquivo original (para uso futuro)
    this.snackBar.open('Material de apoio indisponível no momento.', 'Fechar', { duration: 3000 });
  }

  goBack(): void {
    this.router.navigate(['/app/activities']);
  }
}