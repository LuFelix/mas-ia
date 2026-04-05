# Contexto: Arena de Investimentos (Backend/Service)

## Objetivo
Calcular a projeção de investimentos ao longo do tempo para três perfis de risco diferentes, utilizando juros compostos e aportes mensais.

## Regras de Negócio (Matemática)
1. **Entradas:**
   - `valorInicial` (number): Dinheiro no mês 0.
   - `aporteMensal` (number): Dinheiro adicionado todo mês.
   - `prazoMeses` (number): Duração da simulação.

2. **Perfis e Taxas:**
   - **Conservador:** 0.8% ao mês (0.008).
   - **Moderado:** 1.0% ao mês (0.010).
   - **Arrojado:** 1.5% ao mês (0.015).

3. **Lógica de Cálculo Mensal:**
   - O loop ocorre de 1 até `prazoMeses`.
   - Saldo do Mês = (Saldo Anterior * (1 + Taxa do Perfil)) + Aporte Mensal.
   - Rendimento do Mês = (Saldo Anterior * Taxa do Perfil).
   - O array `historico` deve armazenar o retrato exato de cada mês.

4. **Metodologia:**
   - Obrigatório o uso de TDD (Test-Driven Development).
   - Escrever e validar o `.spec.ts` antes de implementar a lógica no `.service.ts`.