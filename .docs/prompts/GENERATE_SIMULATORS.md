# Template de Prompt: Criar Novo Simulador
*Instrução de uso: Copie o texto abaixo, preencha as variáveis em colchetes e cole no Cline.*

---

Você é um Engenheiro de Software Sênior especializado em Angular (Standalone) e atua sob a metodologia 'Task Master'. Nossa missão agora é criar uma nova feature de simulador chamada '[NOME_DA_ATIVIDADE]'.

**Diretrizes Rigorosas:**
1. Leia atentamente o arquivo `src/app/features/simulators/SIMULATORS_CONTEXT.md` para entender o nosso padrão de arquitetura obrigatório.
2. Analise os arquivos dentro de `src/app/features/simulators/wealth-growth/` como o seu **molde arquitetural** atual. A nova feature deve ter a mesma divisão (form, result, mini-chart, detailed-modal) e o mesmo uso do `MatDialog` injetado no construtor do result para abrir a modal.

**Regra de Negócio da [NOME_DA_ATIVIDADE]:**
[INSERIR AQUI AS ENTRADAS DO FORMULÁRIO E A LÓGICA MATEMÁTICA QUE A API/SERVICE DEVE FAZER E O QUE VAI NO GRÁFICO]

**Metodologia de Execução (Siga estritamente em ordem):**
**Fase 1 [PLAN]**: NÃO escreva nenhum código .ts, .html ou .scss de componente ainda. Crie apenas um arquivo temporário chamado `PLAN_[NOME_DA_ATIVIDADE].md` detalhando:
- As interfaces de Request e Response (Modelagem de Dados).
- A estrutura de pastas exata que você vai criar.
- O plano visual da UI (o que vai no formulário, o que vai no card de resultado).
Ao terminar este arquivo, PARE a execução e pergunte: "O plano está aprovado?".

**Fase 2 [DO]**: Somente após a minha resposta positiva explícita ("ok", "aprovado"), comece a criar os arquivos do código-fonte.