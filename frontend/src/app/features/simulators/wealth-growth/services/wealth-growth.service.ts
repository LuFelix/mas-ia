import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// O import limpo apontando para a nova pasta
import { 
  WealthGrowthSimulationRequest, 
  WealthGrowthSimulationResponse 
} from '../models/wealth-growth.model';

@Injectable({
  providedIn: 'root'
})
export class WealthGrowthService {
  // Nota: Em produção, substitua localhost pela sua variável de environment (ex: environment.apiUrl)
  private readonly apiUrl = 'http://localhost:3000/simulators/wealth-growth';

  constructor(private http: HttpClient) {}

  calculateProjection(data: WealthGrowthSimulationRequest): Observable<WealthGrowthSimulationResponse> {
    return this.http.post<WealthGrowthSimulationResponse>(`${this.apiUrl}/calculate`, data);
  }
}