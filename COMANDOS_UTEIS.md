
# Criar uma chave SSH
ssh-keygen -t ed25519 -C "luciano@tiweb.app.br"

# Exibir a chave
cat ~/.ssh/gitkey.pub

# Iniciar o agente SSH 
eval "$(ssh-agent -s)"

# Adicionar a chave
ssh-add ~/.ssh/nome-da-chave

# Testar acesso ao github com a chave
ssh -T git@github.com

# guardar modificações temporárias
git stash

# liberar as modificações (depois de mudar para a branch correta)
git stash pop


# mudar de https para ssh
git remote set-url origin git@github.com:usuario/repositorio.git

# verificar o remoto
git remote -v
# Verificar as branchs contidas em outra branch 
## 1. Garanta que você está na branch que quer saber se contem o merge
git checkout develop

## 2. Peça ao Git para listar TODAS as branches que já foram unificadas (merged) na develop
git branch --merged

# Apagar branches antigas
git branch -d nome-da-branch-antiga

# Ele pega o arquivo exatamente como era no MAS-IA (antes do merge) e salva numa cópia chamada resgate_users.ts na sua pasta.
git show HEAD~1:backend/src/users/users.service.ts > resgate_users.ts
# Biblioteca que funciona com o google login no angular
docker compose exec frontend npm install @abacritt/angularx-social-login@2.4.0 --legacy-peer-deps