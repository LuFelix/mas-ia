// Caminho: src/app/layouts/side-nav/side-nav.component.ts

import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { LayoutService } from '../../core/services/layout.service';

interface NavItem {
  link: string;
  label: string;
  icon: string;
  requiredPermission?: string;
}

@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    MatListModule,
    MatIconModule
  ],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.scss'
})
export class SideNavComponent {
  public authService = inject(AuthService);
  public layoutService = inject(LayoutService);

  navItems: NavItem[] = [
    // Início (Dashboard de Métricas)
    { link: '/app/dashboard', label: 'Início', icon: 'home', requiredPermission: 'VIEW_DASHBOARD' },

    // --- SEÇÃO EDUCACIONAL E FINANCEIRA ---

    // Conteúdos (Teoria, Fórmulas e Apoio Pedagógico)
    { 
      link: '/app/content', 
      label: 'Conteúdos', 
      icon: 'menu_book' // Sem requiredPermission para que fique aberto, ou defina a permissão desejada
    },

    // Atividades (Simulador Visual, Conversor e Arena)
    { 
      link: '/app/activities', 
      label: 'Atividades', 
      icon: 'calculate' 
    },

    // --- SEÇÃO GERENCIAL E CERTIFICAÇÃO ---

    // Usuários (Gerencial)
    { link: '/app/users', label: 'Usuários', icon: 'group', requiredPermission: 'READ_USERS' }, 

    // Certificações (Gerencial)
    { link: '/app/certifications-management', label: 'Gerenciar Certificações', icon: 'assignment_turned_in', requiredPermission: 'READ_CERTIFICATIONS' },

    // Atividades (Gerencial)
    { link: '/app/activities-management', label: 'Gerenciar Atividades', icon: 'settings', requiredPermission: 'READ_ACTIVITIES' },

    // Certificações Disponíveis (Candidato)
    {
      link: '/app/available-certifications', 
      label: 'Certificações Disponíveis',   
      icon: 'school',                     
      requiredPermission: 'TAKE_CERTIFICATIONS' 
    },

    // Minhas Conquistas (Candidato)
    {
      link: '/app/achievements', 
      label: 'Minhas Conquistas',
      icon: 'workspace_premium', 
      requiredPermission: 'TAKE_CERTIFICATIONS'
    },

    // Convidar Colaboradores
    { link: '/app/invite', label: 'Convidar', icon: 'person_add', requiredPermission: 'INVITE_USER' }, 

    // Verificar Certificado
    {
      link: '/app/certificate/verify', 
      label: 'Verificar Certificado',  
      icon: 'verified_user', 
      requiredPermission: 'TAKE_CERTIFICATIONS' 
    }
  ];

  // Função auxiliar para verificar permissão
  canView(item: NavItem): boolean {
    if (!item.requiredPermission) {
      return true; // Se não exigir permissão, mostra para todos
    }
    return this.authService.hasPermission(item.requiredPermission);
  }
}