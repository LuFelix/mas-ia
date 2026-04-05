// Caminho: src/app/features/activities/components/activity-take-modern/activity-take-modern.component.ts

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';

import { CompleteActivity } from '../../../shared/models/activity.model';

@Component({
  selector: 'app-activity-take-modern',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    MatTooltipModule
  ],
  templateUrl: './activity-take-modern.component.html',
  styleUrls: ['./activity-take-modern.component.scss']
})
export class ActivityTakeModernComponent {
  
  // Recebe os dados do "Chef" (activity-take-page)
  @Input() isLoading = true;
  @Input() errorLoading = false;
  @Input() activity: CompleteActivity | null = null;
  @Input() isDownloading = false;

  // Devolve as ações para o "Chef" processar
  @Output() start = new EventEmitter<void>();
  @Output() downloadMaterial = new EventEmitter<void>();
  @Output() retryLoad = new EventEmitter<void>();
  @Output() goBack = new EventEmitter<void>();

  getActivityIcon(type: string | undefined): string {
    switch (type) {
      case 'simulador': return 'show_chart';
      case 'conversor': return 'sync_alt';
      case 'comparador': return 'compare_arrows';
      default: return 'calculate';
    }
  }
}