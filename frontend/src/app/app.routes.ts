import { Routes } from '@angular/router';
import { LoginPage } from './features/users/pages/login-page/login-page';
import { LandingPage } from './pages/landing-page/landing-page';
import { InvitePage } from './features/invite/components/invite-details/invite-details.component';
import { Expired } from './features/invite/pages/expired/expired';
import { authGuard } from './core/guards/auth-guard'; // Seu guarda de autenticação
import { roleGuard } from './core/guards/role-guard'; // Seu guarda de role (vamos substituir/complementar)
import { PermissionGuard } from './core/guards/permission.guard'; // Importe o guarda de permissão quando criado

// Importa o novo Layout e a página de Métricas
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { DashboardMetricsComponent } from './features/users/pages/dashboard-metrics/dashboard-metrics.component';
import { UnauthorizedComponent } from './features/users/pages/unauthorized-page/unauthorized.component'; // Importa a nova página
//import { Welcome } from './pages/welcome/welcome'; // Assumindo que exista

export const routes: Routes = [
    // Rotas Públicas
    { path: 'login', component: LoginPage, title: 'TechSolutions - Login' },
    { path: '', component: LandingPage }, // Rota raiz pública
    { path: 'invite/expired', component: Expired },
    { path: 'invite/:token', component: InvitePage },
    // Rota para Acesso Negado
    { path: 'unauthorized', component: UnauthorizedComponent },
    // Rotas Protegidas
    {
        path: 'app', // Prefixo para rotas autenticadas (ou pode ser '')
        component: MainLayoutComponent,
        canActivate: [authGuard], // 1º Protege todo o layout com autenticação
        children: [
            // Rota Padrão após login (pode ser welcome ou dashboard)
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, // Redireciona /app para /app/dashboard
            // { path: 'welcome', component: Welcome }, // Se tiver uma página de boas-vindas

            // Rota REAL do Dashboard (com métricas)
            {
                path: 'dashboard',
                component: DashboardMetricsComponent,
                canActivate: [PermissionGuard], // Proteger com permissão VIEW_DASHBOARD
                data: { permissions: ['VIEW_DASHBOARD'] }
            },

            // --- ROTAS: ATIVIDADES E CONTEÚDOS ---
            {   // Rota para Atividades (Simulador Visual, Conversor e Arena)
                path: 'activities', 
                loadComponent: () => import('./features/activities/pages/available-activities-page/available-activities-page.component').then(m => m.AvailableActivitiesPageComponent),
                // Descomentar as linhas seguintes altera o acesso                // canActivate: [PermissionGuard],
                // data: { permissions: ['TAKE_CERTIFICATIONS'] }
            },
            {   // <-- Detalhes da Atividade (Chef) path: 'activities/:id', 
                path: 'activities/:id',
                loadComponent: () => import('./features/activities/pages/activity-take-page/activity-take-page.component').then(m => m.ActivityTakePageComponent),
                // canActivate: [PermissionGuard],
                // data: { permissions: ['TAKE_CERTIFICATIONS'] } // Ajuste a permissão se desejar bloquear no futuro
            },
            // {   // Rota para Conteúdos (Teoria, Fórmulas e Apoio Pedagógico)
            //     path: 'contents', 
            //     loadComponent: () => import('./features/contents/pages/available-contents-page/available-contents-page.component').then(m => m.AvailableContentsPageComponent),
            //     // Descomentar as linhas seguintes altera o acesso
            //     // canActivate: [PermissionGuard],
            //     // data: { permissions: ['TAKE_CERTIFICATIONS'] }
            // },
                        
            // Rotas dos Módulos/Páginas (Lazy Loaded)
            {   // Rota para Usuários (Gerencial)
                path: 'users',
                loadChildren: () => import('./features/users/pages/users-page/users.routes').then(m => m.USERS_ROUTES),
                canActivate: [PermissionGuard], // Usar guarda de permissão aqui
                data: { permissions: ['READ_USERS'] }
            },
            {   // Rota para Certificações (Gerencial)
                path: 'certifications-management',
                // Usando loadChildren para consistência (certifications-management página)
                loadChildren: () => import('./features/certifications/pages/certifications-management-page/certifications-management.routes').then(m => m.CERTIFICATIONS_MANAGEMENT_ROUTES),
                canActivate: [PermissionGuard],
                data: { permissions: ['READ_CERTIFICATIONS'] }
            },
            {   // Rota para Atividades (Gerencial)
                path: 'activities-management',
                loadComponent: () => import('./features/activities/pages/activities-management-page/activities-management-page.component').then(m => m.ActivitiesManagementPageComponent),
                canActivate: [PermissionGuard],
                data: { permissions: ['READ_ACTIVITIES'] } // Ajustar permissão conforme necessário
            },
            {   // Rota para Convidar Colaboradores
                path: 'invite',
                loadChildren: () => import('./features/invite/invite.routes').then(m => m.INVITE_ROUTES),
                canActivate: [PermissionGuard],
                data: { permissions: ['INVITE_USER'] }
            },
            {   // Rota para Perfil do Usuário
                path: 'profile',
                loadChildren: () => import('./features/users/pages/profile-page/profile.routes').then(m => m.PROFILE_ROUTES),
                // Geralmente não precisa de guarda específico aqui, só o authGuard do pai
            },
            {   // Rota para Certificações Disponíveis (visão candidato)
                path: 'available-certifications', // 
                loadComponent: () => import('./features/certifications/pages/available-certifications-page/available-certifications-page.component').then(m => m.AvailableCertificationsPageComponent),
                 canActivate: [PermissionGuard], // Proteger com permissão de candidato
                 data: { permissions: ['TAKE_CERTIFICATIONS'] } // Exemplo
            },

            { // Rota para detalhes da certificação (visão candidato)
                path: 'available-certifications/:id',
                loadComponent: () => import('./features/certifications/pages/certification-take-page/certification-take-page.component').then(m => m.CertificationTakeComponent),
                canActivate: [PermissionGuard],
                data: { permissions: ['TAKE_CERTIFICATIONS'] }
            },
            { // Rota para a REALIZAÇÃO da prova em si
                path: 'exam/:enrollmentId', 
                loadComponent: () => import('./features/certifications/pages/exam-page/exam-page.component').then(m => m.ExamPageComponent),
                canActivate: [PermissionGuard],
                data: { permissions: ['TAKE_CERTIFICATIONS', 'SIMULATE_EXAM'] } // Permitir ambos
            },
            {   // <-- Rota para Minhas Conquistas (visão candidato)
                path: 'achievements', 
                loadComponent: () => import('./features/users/pages/achievements-page/achievements-page.component').then(m => m.AchievementsPageComponent),
                canActivate: [PermissionGuard],
                data: { permissions: ['TAKE_CERTIFICATIONS'] } // Ou qualquer permissão de "candidato"
            },
            {   // Rota para resultado da prova - Aprovado
                path: 'exam-result/passed/:certificationId/:examId',
                loadComponent: () => 
                import('./features/certifications/pages/exam-result-passed/exam-result-passed-page.component')
                .then(m => m.ExamResultPassedComponent)
            },
            {// Rota para resultado da prova - Reprovado
            path: 'exam-result/failed/:certificationId/:examId',
            loadComponent: () => 
            import('./features/certifications/pages/exam-result-failed/exam-result-failed-page.component')
            .then(m => m.ExamResultFailedComponent)
            },
            {// Rota para verificação de certificado (visão candidato e público)
                path: 'certificate/verify',
                loadComponent: () => import('./features/certifications/pages/certificate-verify-page/certificate-verify-page.component')
                    .then(m => m.CertificateVerifyPageComponent) // Usando o nome correto do componente
            },
            //outras rotas filhas aqui
        ]
    },

    // Rota Curinga (opcional, redireciona para login ou landing page)
    { path: '**', redirectTo: '' }
];
