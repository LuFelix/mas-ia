# Padrão de Arquitetura: Simuladores (Activities)

## 1. Estrutura de Componentes
Cada simulador deve conter, no mínimo, a seguinte estrutura de pastas e componentes Standalone:
- `[nome]-form`: Componente com o formulário de entrada (Reactive Forms).
- `[nome]-result`: Componente burro (dumb component) que recebe `@Input() resultData`. Deve exibir um resumo e conter um botão para abrir a análise detalhada.
- `[nome]-mini-chart`: Gráfico simplificado para exibição rápida no card de resultado.
- `[nome]-detailed-modal`: Modal aberta via `MatDialog` contendo abas (MatTabs) com o gráfico Chart.js detalhado e a tabela material (MatTable) com paginação.

## 2. Modelagem de Dados
- Toda interface de requisição deve se chamar `[Nome]Request` (ex: `WealthGrowthRequest`).
- Toda interface de resposta deve se chamar `[Nome]Response`.
- O `Response` **obrigatoriamente** deve conter uma propriedade `history` (array) com os dados mês a mês/ano a ano para alimentar a tabela e os gráficos.

## 3. UI/UX e Bibliotecas
- **Estilo:** Angular Material (`mat-card`, `mat-stroked-button`, `mat-icon`).
- **Gráficos:** `ng2-charts` (Chart.js).
- **Z-Index:** Modais devem obedecer ao fluxo do `cdk-overlay-container`. Não adicionar tags de modal no HTML do template pai, usar apenas injeção via construtor `constructor(private dialog: MatDialog)`.