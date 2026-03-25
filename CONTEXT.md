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
Criar a **Modal de Análise Detalhada** do Simulador de Crescimento Patrimonial. 
O usuário chegará nesta interface ao clicar no botão "Ver Análise Detalhada" exibido abaixo do mini-gráfico.
A missão envolve:
1. Criar um componente de Angular Material Dialog (`MatDialog`).
2. Receber via injeção de dados o array completo do `history` e os totais financeiros.
3. Renderizar um gráfico completo e interativo (Chart.js) com eixos visíveis, legendas e tooltips, comparando o Valor Investido, Poupança e Juros Compostos.
4. (Opcional) Renderizar uma tabela (Data Table) paginada exibindo o detalhamento numérico exato mês a mês para conferência matemática.