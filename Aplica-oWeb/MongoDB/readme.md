# Dockerfile para MongoDB

Este `Dockerfile` configura um container com o MongoDB para ser usado como banco de dados em nossa aplicação. Ele usa a imagem oficial do MongoDB e configura algumas variáveis de ambiente importantes.

## Como funciona:

1. **Imagem base**: Usa a imagem oficial mais recente do MongoDB (`mongo:latest`), garantindo que o MongoDB esteja pronto para uso.

2. **Configuração de usuário e senha**:
   - `MONGO_INITDB_ROOT_USERNAME`: Define o nome de usuário do administrador do MongoDB.
   - `MONGO_INITDB_ROOT_PASSWORD`: Define a senha do administrador do MongoDB.
   - **Importante**: Não deve ser usado para produção com credenciais sensíveis diretamente no Dockerfile.

3. **Exposição da porta**:
   - A porta `27017` é exposta, pois essa é a porta padrão do MongoDB. A comunicação com o banco de dados acontecerá nessa porta.

## Considerações de segurança

- **Evitar senhas no Dockerfile**: Em produção, é altamente recomendável usar variáveis de ambiente externas para não expor senhas diretamente no `Dockerfile`. Uma boa prática seria configurar essas variáveis no `docker-compose.yml` ou em arquivos `.env`.

## Como rodar

### Usando Docker Compose:

No seu `docker-compose.yml`, você pode configurar o MongoDB com as variáveis de ambiente:

```yaml
  mongo:
    build: ./MongoDB
    environment:
      MONGO_INITDB_ROOT_USERNAME: ${MONGO_INITDB_ROOT_USERNAME}
      MONGO_INITDB_ROOT_PASSWORD: ${MONGO_INITDB_ROOT_PASSWORD}
    ports:
      - "27017:27017"



