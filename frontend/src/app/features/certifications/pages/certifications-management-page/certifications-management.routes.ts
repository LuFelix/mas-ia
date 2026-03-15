import { Routes } from '@angular/router';
import { CertificationsManagementPageComponent } from './certifications-management-page.component'; // Componente principal da página de gerenciamento

export const CERTIFICATIONS_MANAGEMENT_ROUTES: Routes = [
  {
    path: '', // Rota padrão para /app/certifications-management
    component: CertificationsManagementPageComponent
  },
  // Adicione rotas filhas específicas de certificações se necessário (ex: /app/certifications-management/new)
];
