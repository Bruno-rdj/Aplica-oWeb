# Dockerfile para PostgreSQL

Este `Dockerfile` configura um container com o PostgreSQL para ser usado como banco de dados relacional. Ele usa a imagem oficial do PostgreSQL e configura algumas variáveis de ambiente importantes.

## Como funciona:

1. **Imagem base**: Usa a imagem oficial mais recente do PostgreSQL (`postgres:latest`), garantindo que o PostgreSQL esteja pronto para uso.

2. **Configuração de usuário, senha e banco de dados**:
   - `POSTGRES_USER`: Define o nome de usuário do administrador do PostgreSQL.
   - `POSTGRES_PASSWORD`: Define a senha do administrador do PostgreSQL.
   - `POSTGRES_DB`: Define o nome do banco de dados a ser criado na inicialização.

3. **Exposição da porta**:
   - A porta `5432` é exposta, pois é a porta padrão do PostgreSQL.

## Considerações de segurança

- **Evitar senhas no Dockerfile**: Em produção, é altamente recomendável usar variáveis de ambiente externas para não expor senhas diretamente no Dockerfile. Uma boa prática seria configurar essas variáveis no `docker-compose.yml` ou em arquivos `.env`.

## Como rodar

### Usando Docker Compose:

No seu `docker-compose.yml`, você pode configurar o PostgreSQL com as variáveis de ambiente:

```yaml
  db:
    build: ./PostgreSQL
    environment:
      POSTGRES_USER: ${POSTGRES_USER}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
      POSTGRES_DB: ${POSTGRES_DB}
    ports:
      - "5432:5432"
    networks:
      - sistema-network
