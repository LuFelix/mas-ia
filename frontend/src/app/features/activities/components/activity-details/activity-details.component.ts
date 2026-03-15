// src/app/features/activities/components/activity-details/activity-details.component.ts

import { Component, inject, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { Observable, catchError, finalize, of, tap } from 'rxjs';

// Imports do service e modelos
import { ActivitiesService } from '../../services/activities.service';
import { CompleteActivity, CreateActivityDto, UpdateActivityDto } from '../../../shared/models/activity.model';

// Interface para os dados do modal
export interface ActivityModalData {
  activityId: string | null;
  isCreation: boolean;
  activity?: CompleteActivity;
}

@Component({
  selector: 'app-activity-details',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, MatDialogModule,
    MatCardModule, MatButtonModule, MatIconModule, MatFormFieldModule,
    MatInputModule, MatDividerModule, MatProgressSpinnerModule,
    MatTooltipModule, MatSlideToggleModule,
    MatOptionModule, MatSelectModule
  ],
  templateUrl: './activity-details.component.html',
  styleUrl: './activity-details.component.scss',
})
export class ActivityDetailsComponent implements OnInit {

  private readonly fb = inject(FormBuilder);
  public dialogRef = inject(MatDialogRef<ActivityDetailsComponent>);
  private activitiesService = inject(ActivitiesService);

  // Propriedades do estado da tela
  activityForm!: FormGroup;
  isDeleting: boolean = false;
  isLoadingDetails: boolean = false;
  isSaving: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ActivityModalData
  ) {}

  ngOnInit(): void {
    this.initializeForm();

    if (!this.data.isCreation && this.data.activityId) {
      this.loadActivityDetails(this.data.activityId);
    }
  }

  private initializeForm(): void {
    this.activityForm = this.fb.group({
      name: ['', [Validators.required]],
      shortDescription: ['', [Validators.required]],
      description: ['', [Validators.required]],
      type: ['', [Validators.required]],
      category: ['', [Validators.required]],
      difficultyLevel: ['', [Validators.required]],
      hasAI: [false],
      isActive: [true]
    });

    // Se temos dados da atividade, preenche o formulário
    if (this.data.activity) {
      this.activityForm.patchValue(this.data.activity);
    }
  }

  private loadActivityDetails(id: string): void {
    this.isLoadingDetails = true;
    this.activitiesService.findActivityById(id)
      .pipe(
        finalize(() => this.isLoadingDetails = false)
      )
      .subscribe({
        next: (activity: CompleteActivity) => {
          this.activityForm.patchValue(activity);
        },
        error: (error: any) => {
          console.error('Erro ao carregar atividade:', error);
          // TODO: mostrar snackbar de erro
        }
      });
  }

  onSave(): void {
    if (this.activityForm.invalid) {
      this.activityForm.markAllAsTouched();
      return;
    }

    this.isSaving = true;
    const formValue = this.activityForm.value;

    if (this.data.isCreation) {
      const createDto: CreateActivityDto = {
        name: formValue.name,
        shortDescription: formValue.shortDescription,
        description: formValue.description,
        type: formValue.type,
        category: formValue.category,
        difficultyLevel: formValue.difficultyLevel,
        hasAI: formValue.hasAI
      };
      this.activitiesService.createActivity(createDto)
        .pipe(finalize(() => this.isSaving = false))
        .subscribe({
          next: (activity: CompleteActivity) => {
            this.dialogRef.close(activity);
          },
          error: (error: any) => {
            console.error('Erro ao criar atividade:', error);
            // TODO: mostrar snackbar de erro
          }
        });
    } else {
      const updateDto: UpdateActivityDto = {
        name: formValue.name,
        shortDescription: formValue.shortDescription,
        description: formValue.description,
        type: formValue.type,
        category: formValue.category,
        difficultyLevel: formValue.difficultyLevel,
        hasAI: formValue.hasAI,
        isActive: formValue.isActive
      };
      this.activitiesService.updateActivity(this.data.activityId!, updateDto)
        .pipe(finalize(() => this.isSaving = false))
        .subscribe({
          next: (activity: CompleteActivity) => {
            this.dialogRef.close(activity);
          },
          error: (error: any) => {
            console.error('Erro ao atualizar atividade:', error);
            // TODO: mostrar snackbar de erro
          }
        });
    }
  }

  onDelete(): void {
    if (!this.data.activityId) return;

    const confirmed = confirm('Tem certeza que deseja excluir esta atividade? Esta ação não pode ser desfeita.');
    if (!confirmed) return;

    this.isDeleting = true;
    this.activitiesService.deleteActivity(this.data.activityId)
      .pipe(
        finalize(() => this.isDeleting = false)
      )
      .subscribe({
        next: () => {
          this.dialogRef.close('deleted');
        },
        error: (error) => {
          console.error('Erro ao excluir atividade:', error);
          // TODO: mostrar snackbar de erro
        }
      });
  }

  onClose(): void {
    this.dialogRef.close();
  }
}