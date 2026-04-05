# Aplicação Backend - MAS Motor de Aprendizagem Smart

Este repositório contém o código-fonte da API em **NestJS**.

---

## 🚀 Como Executar o Projeto

Esta aplicação foi projetada para ser executada como parte de um ambiente Docker Compose, que gerencia a comunicação com o frontend.

### Passo 1: Inicializar o Docker Compose

Na **pasta raiz do projeto** (`mas-ia/`), execute:

```bash
docker-compose up -d
```

Isto iniciará:
- ✅ Backend (NestJS)
- ✅ Frontend (Angular)
- ✅ PostgreSQL (Banco de dados)

Aguarde ~30-60 segundos para que todos os containers estejam prontos.

---

## 🌱 Passo 2: Executar o Seed (Popular o Banco de Dados)

Após o `docker-compose up -d`, você precisa popular o banco com dados iniciais.

### Opção 1️⃣: Script Automatizado (RECOMENDADO)

Na **pasta do backend**, execute:

```bash
./migration-seed.sh
```

Ou da **pasta raiz do projeto**:

```bash
./backend/migration-seed.sh
```

**Este script vai:**
- ✓ Verificar se Docker está rodando
- ✓ Aguardar o banco de dados ficar pronto
- ✓ Criar as tabelas automaticamente (TypeORM)
- ✓ Popular com dados iniciais (Roles e Usuário Admin)
- ✓ Mostrar todos os logs em tempo real
- ✓ Exibir as credenciais para login

### Opção 2: Comando Direto (Manual)

```bash
docker-compose exec backend npm run seed:verbose
```

Or, para acompanhar em tempo real:

```bash
docker-compose exec -it backend npm run seed:verbose
```

### Opção 3: Entrar no Container (Modo Interativo)

```bash
# 1. Entre no container do backend
docker-compose exec -it backend bash

# 2. Execute o seed
npm run seed:verbose

# 3. Saia do container
exit
```

---

## 📊 O que o Seed Cria

### 3 Roles (Papéis/Funções):
- `colaborador`
- `administrador`
- `gente_e_cultura`

### 1 Usuário Administrador:

```
Email:  admin@meusistema.com
Senha:  Senha@123
CPF:    00000000000
Nome:   Usuário Administrador
Role:   administrador
```

---

## ✨ Exemplo de Execução

```
$ ./migration-seed.sh

════════════════════════════════════════════════════════════
  🌱 SEED - EXECUÇÃO COMPLETA (MIGRATIONS AUTOMÁTICAS)
════════════════════════════════════════════════════════════

ℹ Detectando localização do projeto...
✓ Projeto encontrado em: ..

▶ Etapa 1: Verificando docker-compose
✓ docker-compose disponível

▶ Etapa 2: Verificando status dos containers
✓ Backend está rodando

▶ Etapa 3: Aguardando banco de dados ficar pronto
ℹ Testando conexão com o banco...
✓ Banco de dados pronto!

▶ Etapa 4: Executando seed (populando dados)
ℹ Conectando ao container backend...
ℹ As tabelas serão criadas automaticamente via TypeORM

═══════════════════════════════════════════════════════════
  🌱 SCRIPT DE SEED - POPULAÇÃO INICIAL DO BANCO
═══════════════════════════════════════════════════════════

▶ Etapa 1: Inicializando aplicação NestJS
✓ Aplicação NestJS inicializada com sucesso

▶ Etapa 2: Verificando conexão com banco de dados
✓ Conexão com banco de dados estabelecida

▶ Etapa 3: Verificando dados existentes
ℹ Roles existentes: 0
ℹ Usuários existentes: 0

▶ Etapa 4: Executando processo de seeding

▶ Etapa 5: Verificando resultado final
ℹ Roles criadas: 3
ℹ Usuários criados: 1

═══════════════════════════════════════════════════════════
✅ SEEDING CONCLUÍDO COM SUCESSO!
═══════════════════════════════════════════════════════════

Resumo:
  • Total de Roles: 3
  • Total de Usuários: 1
  • Tempo de execução: 2.45s

▶ Encerrando
✓ Script finalizado com sucesso!

1. Abra seu frontend no navegador
2. Faça login com:
   Email:  admin@meusistema.com
   Senha:  Senha@123
3. Comece a usar o sistema! 🎉
```

---

## 🎯 Próximos Passos Após o Seed

1. **Abra seu navegador** e acesse o frontend
   ```
   http://localhost:3000  (ou a porta configurada)
   ```

2. **Faça login** com as credenciais do admin:
   ```
   Email:  admin@meusistema.com
   Senha:  Senha@123
   ```

3. **Digite do sistema** e comece a usar! 🎉

---

## 📋 Arquivos Relacionados ao Seed

| Arquivo | Descrição |
|---------|-----------|
| `src/run-seed.ts` | Script principal de seeding com logs detalhados |
| `src/seed.ts` | Script original mais simples |
| `src/seeds/seed.service.ts` | Lógica de seed (cria Roles e Usuário) |
| `src/seeds/seed.module.ts` | Módulo NestJS do seed |
| `migration-seed.sh` | Script bash que automatiza o seed |
| `SEEDING_GUIDE.md` | Documentação completa do seeding |

---

## 🆘 Troubleshooting

### "Backend não está rodando!"

```bash
# Verifique o status dos containers
docker-compose ps

# Se nenhum estiver rodando, inicie
docker-compose up -d

# Aguarde ~30 segundos e tente novamente
./migration-seed.sh
```

### "Connection refused"

O PostgreSQL está demorando para iniciar:

```bash
# Aguarde mais alguns segundos
sleep 10

# Tente novamente
./migration-seed.sh
```

### "Seed rodou mas não aparece na UI"

Limpe o cache do navegador:
- **Chrome/Edge:** `Ctrl+F5` ou `Cmd+Shift+R`
- **Firefox:** `Ctrl+Shift+Delete`
- Ou abra em modo anônimo

### "Preciso limpar os dados"

Se precisar apagar e refazer o seed:

```bash
# Entre no container do banco
docker-compose exec db psql -U postgres -d meusistema

# Execute os comandos SQL
DELETE FROM users;
DELETE FROM roles;

# Depois rode o seed novamente
./migration-seed.sh
```

---

## 📚 Estrutura do Projeto

```
backend/
├── src/
│   ├── seeds/              # 🌱 Seed service e module
│   │   ├── seed.service.ts
│   │   └── seed.module.ts
│   │
│   ├── activities/         # 📝 Domínio: Atividades Pedagógicas
│   │   ├── dto/
│   │   │   ├── create-activity.dto.ts
│   │   │   └── update-activity.dto.ts
│   │   ├── entities/
│   │   │   └── activity.entity.ts
│   │   ├── activities.controller.spec.ts
│   │   ├── activities.controller.ts
│   │   ├── activities.module.ts
│   │   ├── activities.service.spec.ts
│   │   └── activities.service.ts
│   │
│   ├── simulators/         # 🎮 Domínio: Simuladores (Ex: Arena Investments)
│   │   ├── dto/
│   │   │   ├── create-simulator-result.dto.ts
│   │   │   └── ...
│   │   ├── entities/
│   │   │   └── simulator.entity.ts
│   │   ├── simulators.controller.ts
│   │   ├── simulators.module.ts
│   │   └── simulators.service.ts
│   │
│   ├── mas/                # 🧠 Domínio: Motor de Aprendizagem Smart (Tutor)
│   │   ├── dto/
│   │   │   └── send-message.dto.ts
│   │   ├── entities/
│   │   │   └── interaction.entity.ts
│   │   ├── mas.controller.ts
│   │   ├── mas.module.ts
│   │   ├── mas.service.ts
│   │   └── mas.service.spec.ts
│   │
│   ├── admin/              # ⚙️ Domínio: Painel Administrativo
│   │   └── ... (estrutura padrão: dto, entities, controller, service, module, specs)
│   ├── auth/               # 🔐 Domínio: Autenticação (JWT, Login)
│   │   └── ... (estrutura padrão)
│   ├── certificates/       # 📜 Domínio: Emissão de Certificados
│   │   └── ... (estrutura padrão)
│   ├── certifications/     # 🎓 Domínio: Trilhas de Certificação
│   │   └── ... (estrutura padrão)
│   ├── enrollments/        # 📋 Domínio: Matrículas
│   │   └── ... (estrutura padrão)
│   ├── exams/              # 📝 Domínio: Avaliações/Provas
│   │   └── ... (estrutura padrão)
│   ├── invites/            # ✉️ Domínio: Convites de Acesso
│   │   └── ... (estrutura padrão)
│   ├── mailer/             # 📧 Domínio/Infra: Envio de E-mails
│   │   └── ... (estrutura padrão)
│   ├── questions/          # ❓ Domínio: Banco de Questões
│   │   └── ... (estrutura padrão)
│   ├── roles/              # 🎭 Domínio: Papéis (RBAC)
│   │   └── ... (estrutura padrão)
│   └── users/              # 👤 Domínio: Usuários
│       └── ... (estrutura padrão)
│
├── test/                   # 🧪 Testes E2E (End-to-End)
│   ├── app.e2e-spec.ts
│   └── jest-e2e.json
│
├── migration-seed.sh       # 🔧 Script de seed
├── seed-docker.sh          # 🔧 Script Docker
├── src/run-seed.ts         # 🌱 Script de seed detalhado
├── src/seed.ts             # 🌱 Script de seed simples
├── nest-cli.json
├── tsconfig.json
└── package.json

```

---

## 🔄 Fluxo de Inicialização Completa

```
1. docker-compose up -d
   ↓
2. Aguarde 30-60 segundos
   ↓
3. ./migration-seed.sh
   ↓
4. Abra o frontend no navegador
   ↓
5. Faça login com admin@meusistema.com / Senha@123
   ↓
6. ✅ Pronto! Use o sistema!
```

---

## 📞 Mais Informações

Para informações mais detalhadas sobre o seeding, consulte:

- `SEEDING_GUIDE.md` - Documentação completa
- `SEED_DOCKER_GUIDE.md` - Guia específico do script Docker
- `DATASOURCE_ERROR_SOLUTION.md` - Solução de erros comuns
