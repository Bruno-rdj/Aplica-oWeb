# Acesso e Análise de Logs

## 1. Configuração Inicial
Para iniciar o processo, organizei as pastas do projeto contendo os arquivos necessários, incluindo os Dockerfiles. Em seguida, criei o arquivo docker-compose.yml para orquestrar as imagens das seguintes pastas:
- db
- grafana
- postgres-exporter
- prometheus

### 2. Construção e Execução dos Contêineres
Com o ambiente devidamente estruturado, executei o comando abaixo para criar e levantar as imagens:
docker-compose up -d


Isso garantiu que todos os serviços estivessem em execução corretamente.

### 3. Acesso às Ferramentas
Após a inicialização, acessei as interfaces web das ferramentas:
- Grafana: http://localhost:3000
- Prometheus: http://localhost:9090

### 4. Configuração do Grafana
- Fiz login no Grafana utilizando as credenciais padrão (admin / admin).
- No menu superior esquerdo, cliquei na logo do Grafana e naveguei até Dashboards.
- No canto superior direito, selecionei New → Import.
- Digitei o ID 9628, conforme instruído pelo professor.
- No campo DS_PROMETHEUS, cliquei em + Add new data source e selecionei Prometheus.
- Em Connection, configurei o endereço:
http://host.docker.internal:9090
- Cliquei em Save & Test para validar a conexão, recebendo a mensagem de sucesso:
Successfully queried the Prometheus API.


### 5. Finalizando a Importação do Dashboard
Após a configuração inicial:
- Voltei ao Dashboards e repeti o processo de Import.
- Novamente inseri o ID 9628.
- Dessa vez, o campo DS_PROMETHEUS já listava o Prometheus como opção.
- Após selecionar e concluir a importação, as estatísticas do banco de dados PostgreSQL foram exibidas corretamente.
