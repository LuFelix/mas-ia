# [CONTEXTO DO PROJETO: MAS - Motor de Aprendizagem Smart]

## 1. Visão Geral e Identidade
- **Nome do Projeto:** MAS (Motor de Aprendizagem Smart). Domínio: `mas.ia.br`.
- **Natureza:** Sistema Web/Mobile Interativo para Ensino de Matemática Financeira (Projeto de Pesquisa PIBIC).
- **Integração de IA:** O sistema utilizará a API do Gemini.

## 2. Stack Tecnológica (Monorepo)
- **Frontend:** Angular (Standalone Components, Angular Material com o tema `@angular/material/prebuilt-themes/azure-blue.css`, SCSS, Tailwind/Flexbox).
- **Backend:** NestJS (REST API, TypeORM, Class-Validator, Swagger).
- **Banco de Dados:** PostgreSQL.
- **Infraestrutura:** Docker (docker-compose.yml na raiz unindo front, back e db).

## 3. Padrões de Arquitetura (REGRAS RÍGIDAS)
- **Frontend (Smart vs. Dumb Components):**
  - Páginas (`/pages`) são os "Chefs" (Smart): Injetam serviços, acessam rotas, chamam o backend.
  - Componentes de Layout (`/components`) são os "Garçons" (Dumb): NÃO acessam banco nem rotas. Apenas recebem `@Input()` e emitem `@Output()`.
- **Backend:** Separação estrita entre `Controllers`, `Services`, `DTOs` e `Entities`. Soft delete habilitado (`isActive`).

## 4. Estado Atual do Sistema
- O monorepo está limpo, configurado e com o `.env` isolado no backend.
- **Backend:** Tabela `activities` criada e CRUD operante.
- **Frontend:** Backoffice (Listagem Gerencial e Modal de Edição) das atividades totalmente concluído e funcional.

## 5. Missão Imediata (Next Step)
Criar o Frontend do **Simulador Visual de Crescimento Patrimonial**. O usuário chegará nesta tela após clicar em "Iniciar Simulação" nos detalhes da atividade. 
A arquitetura deve seguir estritamente o padrão Smart/Dumb:
1. Um "Smart Component" (Página) para gerenciar o estado e ler o `:id` da rota.
2. Um "Dumb Component" (Formulário) recebendo inputs para: Capital Inicial, Aporte Mensal, Taxa de Juros Mensal e Prazo (em meses).
3. Um "Dumb Component" (Visualização) para exibir o resultado financeiro simulado.
A interface deve utilizar estritamente os componentes do Angular Material (Cards, Form Fields, Buttons) aproveitando a paleta de cores primária e secundária do tema `azure-blue`, integrados com Tailwind CSS para alinhamento e grid responsivo.