# Dockerfile para Node.js

Este `Dockerfile` configura um container com Node.js para rodar uma aplicação web. Ele instala as dependências do projeto e expõe a porta 3000 para a comunicação com a aplicação.

## Como funciona:

1. **Imagem base**: Usa a imagem oficial mais recente do Node.js (`node:latest`), garantindo que você tenha a versão mais atual do Node.js.

2. **Instalação de dependências**: O comando `npm install` instala todas as dependências definidas no `package.json` da aplicação.

3. **Exposição da porta**: A porta `3000` é exposta, pois é onde a aplicação Node.js vai rodar.

## Como rodar

### Usando Docker Compose:

No seu `docker-compose.yml`, você pode configurar o Node.js:

```yaml
  node:
    build: ./Node-app
    ports:
      - "3000:3000"
    depends_on:
      - mongo
      - db
    networks:
      - sistema-network
