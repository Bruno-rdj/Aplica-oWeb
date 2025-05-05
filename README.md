# **Aplica-oWeb - Sistema de Pesquisa de Satisfação **

Este projeto consiste em uma aplicação web desenvolvida com o objetivo de coletar a opinião dos alunos do curso de Análise e Desenvolvimento de Sistemas por meio de pesquisas de satisfação. Para garantir um ambiente de desenvolvimento padronizado e facilmente replicável, a aplicação foi containerizada com Docker.

## Estrutura do Projeto

O projeto é composto pelos seguintes diretórios e arquivos:

---
```plaintext
Aplica-oWeb/Docker
│
├── Grafana/                         # Container do Grafana
│   ├── Dashboards/                  # Dashboard customizado para o Grafana
│   │   └── Dockerfile
│   ├── dashboards.json              # Configuração dos dashboards
│
├── MongoDB/                         # Container do MongoDB
│   ├── Dockerfile
│   └── README.md
│
├── Node-app/                        # Aplicação Node.app
│   ├── src/                         # Código-fonte da aplicação
│   │   └── app.js
│   │   └── package.json
│   ├── Dockerfile
│   └── README.md
│
├── Postgres-Exporter/              # Exportador de métricas do PostgreSQL
│   └── Dockerfile
│
├── PostgreSQL/                     # Container do PostgreSQL
│   ├── Dockerfile
│   └── README.md
│
├── Prometheus/                     # Container do Prometheus
│   ├── Dockerfile
│   └── prometheus.yml              # Configuração do Prometheus
│
├── docker-compose.yml              # Orquestração dos containers
└── README.md                       # Documentação geral do projeto
```
---

## O projeto consiste nos seguintes componentes principais:

- **Docker**: Utilizado para containerizar os serviços, garantindo que o ambiente de execução seja isolado e idêntico em qualquer máquina.
- **Docker Compose**: Ferramenta para orquestrar múltiplos containers Docker, facilitando a configuração e execução de múltiplos serviços.
- **MongoDB**: Banco de dados NoSQL de código aberto utilizado para armazenar dados não-relacionais.
- **PostgreSQL**: Banco de dados relacional de código aberto utilizado para armazenar dados estruturados e permitir consultas SQL.
- **Node.app**: Ambiente de execução JavaScript do lado do servidor, usado para rodar a aplicação web.
- **Prometheus**: Ferramenta de monitoramento e coleta de métricas open-source, utilizada para armazenar e consultar dados de desempenho dos serviços em tempo real.
- **Postgres Exporter**: Exportador de métricas específico para PostgreSQL, usado em conjunto com o Prometheus para coletar estatísticas do banco de dados.
- **Grafana**: Plataforma de visualização e análise de métricas, usada para criar dashboards interativos e acompanhar o desempenho da aplicação e seus componentes em tempo real.

---

## Como executar o projeto com Docker Compose

Siga os passos abaixo para rodar a aplicação utilizando Docker Compose em sua máquina local:

---

### **1. Clone o repositório**

Clone o projeto para o seu computador:

```bash
git clone https://github.com/Bruno-rdj/Aplica-oWeb.git

cd Aplica-oWeb
```

---

### **2. Verifique se o Docker e o Docker Compose estão instalados**

Execute os comandos abaixo para garantir que as ferramentas estão instaladas corretamente:

```bash
docker --version

docker-compose --version
```

Se ainda não tiver o Docker e o Docker Compose instalados, siga as instruções oficiais de instalação:

- [Instalar Docker](https://docs.docker.com/get-docker/)
- [Instalar Docker Compose](https://docs.docker.com/compose/install/)

Após a instalação do Docker, verefique se tudo está funcionando corretamente dando os seguintes comandos: `docker --version` e o `docker-compose -- version`.

---

### **3. Finalize containers existentes (se caso houver)**

Antes de iniciar o projeto, pare e remova qualquer container em execução:

```bash
docker-compose down
```

---

### **4. (Opcional) Remova o volume de dados do PostgreSQL**

Se necessário, remova os dados persistentes do PostgreSQL para iniciar do zero:

```bash
docker volume rm AulaMicroservico_postgres_data
```

---

### **5. Construa e inicie os containers com Docker Compose**

No diretório raiz do projeto, execute:

```bash
docker-compose up --build
```

Esse comando irá **construir as imagens** e iniciar os containers definidos no arquivo `docker-compose.yml`.

---

### **6. Acesse a aplicação**

Após a inicialização, os serviços estarão disponíveis nos seguintes endereços:

* O Node.js estará rodando na porta 3000, e você pode acessar a aplicação web através de http://localhost:3000.

* O MongoDB estará rodando na porta 27017, e você pode conectar-se a ele com as credenciais definidas no docker-compose.yml.

* O PostgreSQL estará rodando na porta 5432, e você pode conectar-se a ele com as credenciais definidas no docker-compose.yml.

---



