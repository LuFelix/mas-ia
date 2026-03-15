// src/app/features/activities/components/activities-list/activities-list.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CompleteActivity } from '../../../shared/models/activity.model';

@Component({
  selector: 'app-activities-list',
  standalone: true,
  imports: [
    CommonModule,
    DatePipe,
    MatTableModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule
  ],
  templateUrl: './activities-list.component.html',
  styleUrl: './activities-list.component.scss'
})
export class ActivitiesListComponent {

  // --- O "GARÇOM" (BURRO) SÓ RECEBE DADOS ---
  @Input() dataSource = new MatTableDataSource<CompleteActivity>([]);
  @Input() isLoading = true;
  @Input() isDeleting = false;
  @Input() displayedColumns: string[] = [];

  // --- E EMITE EVENTOS ("SININHOS") ---
  @Output() openDetails = new EventEmitter<CompleteActivity>();

  /**
   * Retorna o ícone do Material Symbols com base no tipo.
   */
  getTypeIcon(type: string | undefined): string {
    if (!type) return 'help_outline';
    switch (type) {
      case 'simulador': return 'calculate';
      case 'conversor': return 'swap_horiz';
      case 'comparador': return 'compare_arrows';
      default: return 'help_outline';
    }
  }

  /**
   * Retorna o texto traduzido do tipo.
   */
  getTypeText(type: string | undefined): string {
    if (!type) return 'Não Definido';
    switch (type) {
      case 'simulador': return 'Simulador';
      case 'conversor': return 'Conversor';
      case 'comparador': return 'Comparador';
      default: return 'Não Definido';
    }
  }

  /**
   * Retorna o ícone baseado no nível de dificuldade.
   */
  getDifficultyIcon(difficultyLevel: string | undefined): string {
    if (!difficultyLevel) return 'help_outline';
    switch (difficultyLevel.toLowerCase()) {
      case 'iniciante': return 'school';
      case 'intermediario': return 'trending_up';
      case 'avancado': return 'rocket';
      default: return 'help_outline';
    }
  }

  /**
   * Retorna o texto do nível de dificuldade.
   */
  getDifficultyText(difficultyLevel: string | undefined): string {
    if (!difficultyLevel) return 'Não Definido';
    return difficultyLevel.charAt(0).toUpperCase() + difficultyLevel.slice(1);
  }
}