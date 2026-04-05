
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
