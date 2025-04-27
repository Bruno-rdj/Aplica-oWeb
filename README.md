

## **README.md (Aplica-oWeb)**

Este é um projeto de aplicação web com integração de vários serviços usando Docker e Docker Compose. O projeto é composto por três principais containers: **MongoDB**, **PostgreSQL** e **Node.js**, que são configurados e orquestrados via **Docker** e **Docker Compose**.

Abaixo estão os detalhes de cada serviço e como configurar e rodar a aplicação localmente.

## 🛠️ Tecnologias e Ferramentas

- **Docker**: Utilizado para containerizar os serviços, garantindo que o ambiente de desenvolvimento seja consistente em qualquer máquina.
- **Docker Compose**: Ferramenta para orquestrar múltiplos containers Docker, facilitando a configuração e execução de múltiplos serviços.
- **MongoDB**: Banco de dados NoSQL, utilizado para armazenar dados de forma não-relacional.
- **PostgreSQL**: Banco de dados relacional, utilizado para armazenar dados estruturados e permitir consultas SQL.
- **Node.js**: Ambiente de execução JavaScript do lado do servidor, usado para rodar a aplicação web.

---

## 🚀 Como rodar o projeto

### Pré-requisitos

Certifique-se de que você tem o **Docker** e o **Docker Compose** instalados em sua máquina. Você pode verificar se o Docker está instalado corretamente com os seguintes comandos:

```bash
docker --version

docker-compose --version
```

Se não estiver instalado, você pode seguir as instruções de instalação oficial do Docker e Docker Compose:

- [Instalar Docker](https://docs.docker.com/get-docker/)
- [Instalar Docker Compose](https://docs.docker.com/compose/install/)

### Passos para executar o projeto

1. **Clone o repositório** para sua máquina local:

```bash
git clone https://github.com/seu-usuario/Aplica-oWeb.git


cd Aplica-oWeb
```

2. **Construa e inicie os containers** com o Docker Compose:

```bash
docker-compose up --build
```

Este comando irá construir as imagens Docker a partir dos `Dockerfile`s em cada diretório e iniciar os containers dos serviços.

3. **Acesse os serviços**:

- O **Node.js** estará rodando na porta `3000`, e você pode acessar a aplicação web através de `http://localhost:3000`.
- O **MongoDB** estará rodando na porta `27017`, e você pode conectar-se a ele com as credenciais definidas no `docker-compose.yml`.
- O **PostgreSQL** estará rodando na porta `5432`, e você pode conectar-se a ele com as credenciais definidas no `docker-compose.yml`.

4. **Parar os containers**:

Se você precisar parar os containers, basta executar o seguinte comando:

```bash
docker-compose down
```

---

## 🧩 Estrutura do Projeto

O projeto é dividido em três principais diretórios, cada um representando um serviço individual. Aqui está a estrutura básica:

```plaintext
Aplica-oWeb/
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

O MongoDB é um banco de dados NoSQL utilizado no projeto. A configuração no `Dockerfile` inclui a definição de variáveis de ambiente para o nome de usuário e senha do administrador, além da exposição da porta padrão `27017`.

**Dockerfile** (MongoDB):
```dockerfile
FROM mongo:latest

ENV MONGO_INITDB_ROOT_USERNAME=admin 
ENV MONGO_INITDB_ROOT_PASSWORD=admin

EXPOSE 27017
```

### PostgreSQL

O PostgreSQL é um banco de dados relacional utilizado para armazenar dados estruturados. No `Dockerfile` do PostgreSQL, as variáveis de ambiente são configuradas para criar o usuário, a senha e o banco de dados durante a inicialização do container.

**Dockerfile** (PostgreSQL):
```dockerfile
FROM postgres:latest

ENV POSTGRES_USER=admin
ENV POSTGRES_PASSWORD=admin
ENV POSTGRES_DB=satisfacao

EXPOSE 5432
```

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

### Docker Compose

O `docker-compose.yml` orquestra os containers de MongoDB, PostgreSQL e Node.js, definindo as variáveis de ambiente necessárias, as portas expostas e a dependência entre os serviços.

**docker-compose.yml**:
```yaml
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
