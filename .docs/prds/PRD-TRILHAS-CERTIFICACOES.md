# PRD: Trilhas de Aprendizagem (Domínio: Certifications)

## 1. Visão Geral
A feature de "Trilhas" (representada no código pelo módulo `certifications`) é o núcleo de avaliação da plataforma. Ela une a geração de questões via IA (MAS), a jornada de estudos do aluno (Activities) e a emissão de certificados verificáveis.

## 2. Fluxo do Professor / Tutor (Backoffice)
1. **Upload de Material:** O professor faz upload de um arquivo PDF contendo o material base da Trilha.
2. **Geração via MAS:** O sistema envia o texto do PDF para a API do Gemini (MAS), solicitando a criação de um banco de questões de múltipla escolha.
3. **Curadoria:** O professor revisa as questões geradas, aprovando-as ou descartando-as.
4. **Armazenamento:** Questões aprovadas são salvas no módulo `questions`, vinculadas a esta `Certification`.

## 3. Fluxo do Aluno (Frontend)
1. **Matrícula:** O aluno visualiza a Trilha disponível e clica em "Participar". O sistema aciona o módulo `enrollments` criando o vínculo `User <-> Certification`.
2. **Jornada (Activities):** Dentro da Trilha, o aluno acessa as `Activities` vinculadas.
3. **Acesso ao Material de Apoio:** Na tela de uma Activity (`activity-take-page`), existirá um botão "Material de Apoio". Esse botão faz o download/exibição do PDF original que o professor anexou na `Certification` pai.
4. **Exame:** O aluno realiza a prova (módulo `exams`), que consome as questões geradas pelo MAS.
5. **Recompensa:** Se aprovado, o sistema gera um PDF de certificado com hash de verificação e libera a visualização no painel de "Conquistas" (Gamificação).

## 4. Arquitetura de Relacionamentos (TypeORM)
- `Certification` 1:N `Activity` (Uma trilha tem várias atividades de preparo).
- `Certification` 1:N `Question` (Uma trilha tem seu banco de questões).
- `User` 1:N `Enrollment` N:1 `Certification` (Tabela pivô de matrícula).