# Usa a imagem oficial do Node.js na versão 22 como base
FROM node:22

# Define o diretório de trabalho dentro do container
WORKDIR /usr/src/app

# Copia os arquivos de dependências (package.json e package-lock.json) para o diretório de trabalho
COPY ./src/package*.json ./

# Instala as dependências definidas no package.json
RUN npm install

# Copia todo o código-fonte da aplicação para o diretório de trabalho no container
COPY ./src/ .

# Expõe a porta 3000 para permitir conexões externas à aplicação
EXPOSE 3000

# Define o comando padrão para iniciar a aplicação quando o container for executado
CMD ["node", "app.js"]
