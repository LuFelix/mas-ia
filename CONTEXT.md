# [CONTEXTO DO PROJETO: MAS - Motor de Aprendizagem Smart]

## 1. Visão Geral e Identidade
- **Nome do Projeto:** MAS (Motor de Aprendizagem Smart). Domínio: `mas.ia.br`.
- **Natureza:** Sistema Web/Mobile Interativo para Ensino de Matemática Financeira (Projeto de Pesquisa PIBIC).
- **Integração de IA:** O sistema utilizará a API do Gemini.

## 2. Stack Tecnológica (Monorepo)
- **Frontend:** Angular (Standalone Components, Angular Material, SCSS, Tailwind/Flexbox).
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
- **Backend:** Tabela `activities` criada. Entidade possui os campos `type`, `category`, `difficultyLevel` e `hasAI`. O CRUD está operante.

## 5. Missão Imediata (Next Step)
Criar a **Listagem Gerencial (Backoffice)** das atividades. Precisamos garantir que o administrador consiga listar, criar, editar e excluir as ferramentas interativas no banco de dados, utilizando tabelas do Angular Material e o padrão de Modais (MatDialog) para os formulários de edição/criação. espelhando rigorosamente a arquitetura, os filtros e o visual do módulo de certificações já existente.