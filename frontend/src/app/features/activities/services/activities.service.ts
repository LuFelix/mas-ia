// Caminho: src/app/features/activities/services/activities.service.ts

import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import {
    InitialActivity,
    CompleteActivity,
    ActivityFilterDTO,
    PaginatedActivitiesResponse,
    CreateActivityDto,
    UpdateActivityDto,
} from '../../shared/models/activity.model';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ActivitiesService {
    private readonly API_URL = environment.apiUrl;
    // Ajuste a rota base conforme configurado no seu backend NestJS
    private readonly BASE_PATH = `${this.API_URL}/activities`; 

    private http = inject(HttpClient);
    
    /**
     * Busca as atividades matemáticas com filtros e paginação (GET /activities)
     */
    findAllActivities(filters: ActivityFilterDTO): Observable<PaginatedActivitiesResponse> {
        let params = new HttpParams()
            .set('page', filters.page.toString())
            .set('limit', filters.limit.toString());
            
        if (filters.name) {
            params = params.set('name', filters.name); 
        }

        if (filters.type) {
            params = params.set('type', filters.type); 
        }
        
        // Ajuste para o filtro de status boolean
        if (filters.isActive !== null && filters.isActive !== undefined) {
            params = params.set('isActive', filters.isActive.toString());
        }
        
        return this.http.get<PaginatedActivitiesResponse>(this.BASE_PATH, { params }).pipe(
            map((response) => {
                // Caminhos de imagens/pdfs caso retorne do backend, 
                // seguindo a mesma lógica CertificationsService
                if (response.data) {
                    response.data.forEach(activity => {
                        if (activity.pdfPath) {
                            const fileNameOnDisk = activity.pdfPath.split('/').pop() || '';
                            activity.pdfFileName = fileNameOnDisk; 
                        }
                    });
                }
                return response; 
            })
        );
    }

    /**
     * Busca uma atividade pelo ID (GET /activities/{id})
     */
    findActivityById(id: string): Observable<CompleteActivity> {
        return this.http.get<CompleteActivity>(`${this.BASE_PATH}/${id}`);
     }
    
     /**
     * Cria uma nova atividade (POST /activities)
     * Enviando como JSON padrão.
     */
    createActivity(payload: InitialActivity): Observable<CompleteActivity> {
        return this.http.post<CompleteActivity>(this.BASE_PATH, payload);
    }

    /**
     * Atualiza uma atividade (PATCH /activities/{id})
     */
    updateActivity(id: string, payload: Partial<CompleteActivity>): Observable<CompleteActivity> { 
        return this.http.patch<CompleteActivity>(`${this.BASE_PATH}/${id}`, payload);
    }

    /**
     * Apaga uma atividade (DELETE /activities/{id})
     */
    deleteActivity(id: string): Observable<void> {
        return this.http.delete<void>(`${this.BASE_PATH}/${id}`);
    }
}