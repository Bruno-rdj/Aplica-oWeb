# Usa a imagem oficial do Postgres Exporter como base.
# Essa imagem é mantida por wrouesnel e é usada para coletar métricas do PostgreSQL.
FROM bitnami/postgres-exporter:latest

# Define a variável de ambiente `DATA_SOURCE_NAME`, que contém a string de conexão com o banco de dados PostgreSQL.
# Essa string inclui:
# - Usuário: `postgres`
# - Senha: `yourpassword` (substitua por sua senha real)
# - Host: `db` (nome do serviço PostgreSQL no Docker Compose)
# - Porta: `5432` (porta padrão do PostgreSQL)
# - Banco de dados: `postgres`
# - Parâmetro `sslmode=disable` para desativar a conexão SSL.
ENV DATA_SOURCE_NAME=uspostgreser:minhasenhasecreta@db:5432/northwind?sslmode=disable

# Expõe a porta 9187, que é usada pelo Postgres Exporter para disponibilizar as métricas no formato Prometheus.
EXPOSE 9187

# Define o comando padrão que será executado ao iniciar o contêiner.
# O comando `postgres_exporter` inicia o exportador e começa a coletar métricas do banco de dados PostgreSQL.
# CMD ["postgres_exporter"]