// Caminho: src/app/shared/models/activity.model.ts

/**
 * Interface para os dados de criação/atualização (Payload - POST/PATCH)
 */
export interface InitialActivity {
    name: string; 
    shortDescription: string;
    description: string;
    type: 'simulador' | 'conversor' | 'comparador' | string; // Define o tipo de atividade
    category: string; // Ex: Matemática Financeira, Geometria
    difficultyLevel: string; // Ex: Iniciante, Intermediário, Avançado
    hasAI: boolean; // Indica se a atividade possui integração com a API do Gemini
}

/**
 * Interface para criação de atividade (POST)
 */
export interface CreateActivityDto extends InitialActivity {}

/**
 * Interface para atualização de atividade (PATCH)
 */
export interface UpdateActivityDto extends Partial<CreateActivityDto> {
    isActive?: boolean;
}

/**
 * Interface para a Atividade completa retornada pelo backend (GET).
 */
export interface CompleteActivity extends InitialActivity {
    id: string;
    isActive: boolean; 
    createdAt: string;
    // Campos opcionais caso você queira vincular um PDF de instrução no futuro
    pdfFileName?: string; 
    pdfPath?: string; 
}

// --- INTERFACES DE FILTRO E RESPOSTA ---

// Interface para o DTO de paginação/filtro
export interface ActivityFilterDTO {
    page: number;
    limit: number;
    name?: string | null;
    type?: string | null;
    category?: string | null;
    isActive?: boolean | null;
}

// Interface para a resposta paginada do backend
export interface PaginatedActivitiesResponse {
    data: CompleteActivity[];
    meta: {
        total: number;
        page: number;
        last_page: number;
    };
}