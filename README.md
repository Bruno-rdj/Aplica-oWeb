# **Aplica-oWeb (Projeto Docker - MongoDB, PostgreSQL e Node.js)**

Este repositório contém a configuração de um ambiente Docker para rodar os serviços **MongoDB**, **PostgreSQL** e **Node.js**. O objetivo deste projeto é fornecer uma maneira simples e eficiente de rodar esses três serviços em containers Docker, com a capacidade de configurar credenciais administrativas e bancos de dados iniciais durante a criação dos containers.

A configuração é feita por meio de **Dockerfiles** para cada serviço e um arquivo **docker-compose.yml** que orquestra os containers, garantindo um ambiente consistente e facilmente replicável em diferentes máquinas e plataformas.

## 🛠️ Tecnologias e Ferramentas

- **Docker**: Utilizado para containerizar os serviços, garantindo que o ambiente de execução seja isolado e idêntico em qualquer máquina.
- **Docker Compose**: Ferramenta para orquestrar múltiplos containers Docker, facilitando a configuração e execução de múltiplos serviços.
- **MongoDB**: Banco de dados NoSQL de código aberto utilizado para armazenar dados não-relacionais.
- **PostgreSQL**: Banco de dados relacional de código aberto utilizado para armazenar dados estruturados e permitir consultas SQL.
- **Node.js**: Ambiente de execução JavaScript do lado do servidor, usado para rodar a aplicação web.

## 🚀 Como rodar o projeto

### Pré-requisitos

Antes de começar, você precisa ter o **Docker** e o **Docker Compose** instalados em sua máquina. Você pode verificar se o Docker está instalado corretamente com os seguintes comandos:

```bash
docker --version

docker-compose --version
```

Caso o Docker não esteja instalado, siga as instruções para instalação na documentação oficial:

- [Instalar Docker](https://docs.docker.com/get-docker/)
- [Instalar Docker Compose](https://docs.docker.com/compose/install/)

## Passos para executar o projeto

### 1. **Clone o repositório** para sua máquina local:

```bash
git clone https://github.com/seu-usuario/Projeto-Docker-MongoDB-PostgreSQL-Node.git
cd Projeto-Docker-MongoDB-PostgreSQL-Node
```

### 2. **Construa e inicie os containers** com o Docker Compose:

```bash
docker-compose up --build
```

Esse comando vai construir as imagens Docker a partir dos `Dockerfile`s em cada diretório e iniciar os containers dos serviços.

### 3. **Acesse os serviços**:

- O **Node.js** estará rodando na porta `3000`, e você pode acessar a aplicação web através de `http://localhost:3000`.
- O **MongoDB** estará rodando na porta `27017`, e você pode conectar-se a ele com as credenciais definidas no `docker-compose.yml`.
- O **PostgreSQL** estará rodando na porta `5432`, e você pode conectar-se a ele com as credenciais definidas no `docker-compose.yml`.

### 4. **Parar os containers**:

Se você precisar parar os containers, basta executar o seguinte comando:

```bash
docker-compose down
```

---

## 🧩 Estrutura do Projeto

O projeto é composto pelos seguintes diretórios e arquivos:

```plaintext
Projeto-Docker-MongoDB-PostgreSQL-Node/
│
├── MongoDB/             # Dockerfile para o MongoDB
│   └── Dockerfile
│
├── Node-app/            # Dockerfile para a aplicação Node.js
│   └── Dockerfile
│
├── PostgreSQL/          # Dockerfile para o PostgreSQL
│   └── Dockerfile
│
├── docker-compose.yml   # Arquivo de orquestração dos containers
└── README.md            # Documentação do projeto
```

---

## ⚙️ Detalhes de cada serviço

### MongoDB

O MongoDB é um banco de dados NoSQL utilizado para armazenar dados não-relacionais. Ele é configurado através de um `Dockerfile` que define as variáveis de ambiente para o usuário e a senha do administrador, além de expor a porta padrão `27017`.

**Dockerfile** (MongoDB):
```dockerfile
FROM mongo:latest

ENV MONGO_INITDB_ROOT_USERNAME=admin 
ENV MONGO_INITDB_ROOT_PASSWORD=admin

EXPOSE 27017
```

Explicação:
- **Imagem Base**: Utiliza a imagem oficial do MongoDB.
- **Variáveis de Ambiente**: Define o nome de usuário e senha para o administrador do banco.
- **Exposição da Porta**: Expõe a porta padrão do MongoDB (`27017`) para que o banco de dados possa ser acessado externamente.

### PostgreSQL

O PostgreSQL é um banco de dados relacional utilizado para armazenar dados estruturados. Ele é configurado através de um `Dockerfile`, onde são definidas as variáveis de ambiente para o usuário, senha e banco de dados, além de expor a porta `5432`.

**Dockerfile** (PostgreSQL):
```dockerfile
FROM postgres:latest

ENV POSTGRES_USER=admin
ENV POSTGRES_PASSWORD=admin
ENV POSTGRES_DB=satisfacao

EXPOSE 5432
```

Explicação:
- **Imagem Base**: Utiliza a imagem oficial do PostgreSQL.
- **Variáveis de Ambiente**: Define o nome de usuário, senha e o banco de dados padrão.
- **Exposição da Porta**: Expõe a porta padrão do PostgreSQL (`5432`).

### Node.js

A aplicação Node.js é o backend do projeto. O `Dockerfile` configura o Node.js, instala as dependências do `package.json` e expõe a porta `3000` para acessar a aplicação.

**Dockerfile** (Node.js):
```dockerfile
FROM node:latest

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
```

Explicação:
- **Imagem Base**: Utiliza a imagem oficial do Node.js.
- **Instalação de Dependências**: Copia o `package.json` e instala as dependências com `npm`.
- **Exposição da Porta**: Expõe a porta `3000` para acessar a aplicação web.

### Docker Compose

O `docker-compose.yml` orquestra os containers do MongoDB, PostgreSQL e Node.js. Ele define as variáveis de ambiente, as portas expostas e a dependência entre os serviços.

**docker-compose.yml**:
```yaml
version: '3'

services:
  db:
    build: ./PostgreSQL
    environment:
      POSTGRES_USER: admin
      POSTGRES_PASSWORD: admin
      POSTGRES_DB: satisfacao
    ports:
      - "5432:5432"
    networks:
      - sistema-network

  mongo:
    build: ./MongoDB
    environment:
      MONGO_INITDB_ROOT_USERNAME: admin
      MONGO_INITDB_ROOT_PASSWORD: admin
    ports:
      - "27017:27017"
    networks:
      - sistema-network

  node:
    build: ./Node-app
    ports:
      - "3000:3000"
    depends_on:
      - db
      - mongo
    networks:
      - sistema-network
    volumes:
      - ./Node-app:/app

networks:
  sistema-network:
    driver: bridge
```
