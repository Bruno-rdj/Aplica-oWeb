# Usa a imagem oficial do Prometheus como base.
# Essa imagem é mantida pela equipe do Prometheus e contém o Prometheus pré-configurado.
FROM prom/prometheus:latest

# Copia o arquivo de configuração personalizado `prometheus.yml` para o diretório padrão de configuração do Prometheus.
# O arquivo `prometheus.yml` define como o Prometheus coleta métricas, incluindo os alvos e intervalos de coleta.
COPY prometheus.yml /etc/prometheus/prometheus.yml

# Define o comando padrão que será executado ao iniciar o contêiner.
# O parâmetro `--config.file` especifica o caminho do arquivo de configuração do Prometheus.
CMD [ "--config.file=/etc/prometheus/prometheus.yml" ]