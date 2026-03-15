// src/app/features/activities/pages/activities-management-page/activities-management-page.component.ts

import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { finalize } from 'rxjs';

// Componentes
import { ActivitiesListComponent } from '../../components/activities-list/activities-list.component';
import { ActivityDetailsComponent, ActivityModalData } from '../../components/activity-details/activity-details.component';

// Serviços e modelos
import { ActivitiesService } from '../../services/activities.service';
import { CompleteActivity, ActivityFilterDTO } from '../../../shared/models/activity.model';

@Component({
  selector: 'app-activities-management-page',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatProgressSpinnerModule,
    ActivitiesListComponent
  ],
  templateUrl: './activities-management-page.component.html',
  styleUrl: './activities-management-page.component.scss'
})
export class ActivitiesManagementPageComponent implements OnInit {

  private activitiesService = inject(ActivitiesService);
  private dialog = inject(MatDialog);

  // Estado da página
  dataSource = new MatTableDataSource<CompleteActivity>([]);
  isLoading = true;
  isDeleting = false;
  displayedColumns = ['name', 'type', 'category', 'difficultyLevel', 'hasAI', 'status', 'actions'];

  ngOnInit(): void {
    this.loadActivities();
  }

  loadActivities(): void {
    this.isLoading = true;
    const filters: ActivityFilterDTO = {
      page: 1,
      limit: 100, // Carrega muitas para listagem simples
      isActive: null // Carrega todas
    };

    this.activitiesService.findAllActivities(filters)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: (response) => {
          this.dataSource.data = response.data || [];
        },
        error: (error) => {
          console.error('Erro ao carregar atividades:', error);
          // TODO: mostrar snackbar de erro
        }
      });
  }

  onCreateActivity(): void {
    const dialogData: ActivityModalData = {
      activityId: null,
      isCreation: true
    };

    const dialogRef = this.dialog.open(ActivityDetailsComponent, {
      data: dialogData,
      width: '800px',
      maxHeight: '90vh'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadActivities(); // Recarrega a lista
      }
    });
  }

  onOpenDetails(activity: CompleteActivity): void {
    const dialogData: ActivityModalData = {
      activityId: activity.id,
      isCreation: false,
      activity: activity
    };

    const dialogRef = this.dialog.open(ActivityDetailsComponent, {
      data: dialogData,
      width: '800px',
      maxHeight: '90vh'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadActivities(); // Recarrega a lista
      }
    });
  }
}