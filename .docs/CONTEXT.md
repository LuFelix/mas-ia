# [CONTEXTO DO PROJETO: MAS - Motor de Aprendizagem Smart]

## 1. Visão Geral e Identidade
- **Nome do Projeto:** MAS (Motor de Aprendizagem Smart). Domínio: `mas.ia.br`.
- **Natureza:** Sistema Web/Mobile Interativo para Ensino de Matemática Financeira (Projeto de Pesquisa PIBIC).
- **Integração de IA:** O sistema utilizará a API do Gemini.

## 2. Stack Tecnológica (Monorepo)
- **Frontend:** Angular (Standalone Components, Angular Material com o tema `@angular/material/prebuilt-themes/azure-blue.css`, SCSS, Tailwind/Flexbox, Chart.js/ng2-charts).
- **Backend:** NestJS (REST API, TypeORM, Class-Validator, Swagger).
- **Banco de Dados:** PostgreSQL.
- **Infraestrutura:** Docker (docker-compose.yml na raiz com volumes configurados para isolamento de dependências).

## 3. Padrões de Arquitetura (REGRAS RÍGIDAS)
- **Frontend (Smart vs. Dumb Components):**
  - Páginas (`/pages`) são os "Chefs" (Smart): Injetam serviços, acessam rotas, chamam o backend.
  - Componentes de Layout (`/components`) são os "Garçons" (Dumb): NÃO acessam banco nem rotas. Apenas recebem `@Input()` e emitem `@Output()`.
  - Contratos de dados hiper-específicos vivem na pasta `models` dentro da própria feature.
- **Backend:** Separação estrita entre `Controllers`, `Services`, `DTOs` e `Entities`.

## 4. Estado Atual do Sistema
- O monorepo está limpo, configurado e rodando via Docker.
- **Backend:** - CRUD de atividades operante.
  - Endpoint do simulador de Crescimento Patrimonial (`/simulators/wealth-growth/calculate`) finalizado, retornando totais e a matriz de histórico mês a mês.
- **Frontend:** - Backoffice (Listagem Gerencial e Modal de Edição) das atividades concluído.
  - Tela base do Simulador de Crescimento Patrimonial (Smart/Dumb) finalizada, integrando formulário, requisição à API e exibição de resultados financeiros.
  - Implementado "Mini Gráfico Teaser" (Chart.js) no card de resultados demonstrando a curva de juros compostos versus poupança.

## 5. Missão Imediata (Next Step)
Implementar **testes automatizados do módulo Wealth Growth (backend)** cobrindo DTO e serviço de cálculo.
Próximos focos:
1. Adicionar testes unitários para validação do `SimulateWealthGrowthDto` (campos numéricos e positivos).
2. Cobrir cenários principais do cálculo (aportes, juros compostos e histórico mês a mês).
3. Validar casos de borda (valores zerados permitidos quando aplicável e rejeição de entradas inválidas).

## 6. Histórico de Missões Concluídas
- Ajuste de tipagem no DTO `SimulateWealthGrowthDto` para compatibilidade com `strictPropertyInitialization`, aplicando definite assignment (`!`) nos campos decorados por `class-validator`/`swagger`.
- Missão anterior registrada: criação da **Modal de Análise Detalhada** do Simulador de Crescimento Patrimonial, com foco em `MatDialog`, recepção de `history` e totais, gráfico interativo e tabela opcional paginada.