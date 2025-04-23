# Sistema de Pesquisa de Satisfação - Ambiente Dockerizado

Bem-vindo ao repositório do Sistema de Pesquisa de Satisfação! Este projeto tem como objetivo fornecer um ambiente web para a coleta de dados sobre a satisfação dos alunos no curso de **Análise e Desenvolvimento de Sistemas**. Tudo isso em um ambiente Dockerizado, facilitando a configuração e a escalabilidade.

O sistema é composto por três serviços principais que rodam em containers separados:

- **PostgreSQL**: Banco de dados relacional para armazenar dados estruturados.
- **MongoDB**: Banco de dados NoSQL para dados mais flexíveis e não estruturados.
- **Node.js**: Aplicação backend responsável pela coleta e processamento de dados.

## Arquitetura

O sistema está estruturado de forma a garantir uma boa separação de responsabilidades. Os containers Docker se comunicam entre si em uma rede interna, permitindo um ambiente de desenvolvimento eficiente e isolado.

1. **Container PostgreSQL**: Responsável por armazenar dados estruturados, como respostas a pesquisas.
2. **Container MongoDB**: Armazena dados não estruturados ou mais flexíveis, como logs ou informações adicionais.
3. **Container Node.js**: Serve como backend, processando os dados coletados e interagindo com os bancos de dados.

## Funcionalidade

A principal funcionalidade desse sistema é a coleta de feedback dos alunos sobre a experiência deles no curso de **Análise e Desenvolvimento de Sistemas**. A pesquisa abrange avaliações de disciplinas, professores, infraestrutura, entre outros aspectos.

- **PostgreSQL** é utilizado para armazenar dados estruturados, como respostas às pesquisas.
- **MongoDB** armazena dados mais flexíveis ou registros extras.
- **Node.js** facilita a interação entre os dois bancos de dados e disponibiliza uma API para comunicação com o frontend.

## Serviços

### 1. **PostgreSQL**

O banco de dados PostgreSQL é configurado com as seguintes variáveis de ambiente:

- `POSTGRES_USER`: Usuário do banco de dados (padrão: admin)
- `POSTGRES_PASSWORD`: Senha do banco de dados (padrão: admin)
- `POSTGRES_DB`: Nome do banco de dados (padrão: pesquisa_satisfacao)

O PostgreSQL fica acessível na porta `5432`.

### 2. **MongoDB**

O MongoDB é configurado para inicializar um usuário administrador com as seguintes variáveis:

- `MONGO_INITDB_ROOT_USERNAME`: Usuário administrador (padrão: admin)
- `MONGO_INITDB_ROOT_PASSWORD`: Senha do administrador (padrão: admin)

Ele fica acessível na porta `27017`.

### 3. **Node.js**

A aplicação Node.js está configurada para a versão 22 do Node.js. Ela se conecta aos dois bancos de dados, PostgreSQL e MongoDB, para processar e armazenar os dados de forma eficiente.

A aplicação backend pode ser acessada na porta `3000`.

## 🔧 Pré-requisitos

Antes de começar, você precisa garantir que tem o Docker e o Docker Compose instalados na sua máquina.

- **Docker**: [Como instalar o Docker](https://docs.docker.com/get-docker/)
- **Docker Compose**: [Como instalar o Docker Compose](https://docs.docker.com/compose/install/)

Verifique se está tudo funcionando com os seguintes comandos:

```bash
docker --version

docker-compose --version
```

#### 1. Clonar o Repositório
Clone o repositório para sua máquina:

```bash
git clone https://github.com/seu-usuario/sistema-pesquisa-satisfacao.git

cd sistema-pesquisa-satisfacao
```

#### 2. Subir os Containers
Para iniciar os containers Docker, rode o comando:

```bash
docker-compose up --build
```

Este comando irá construir as imagens e iniciar os containers dos serviços.

#### 3. Acessar os Serviços
Depois que os containers estiverem rodando, você pode acessar os serviços nos seguintes endereços:

Backend (Node.js): http://localhost:3000

PostgreSQL: localhost:5432

Usuário: admin

Senha: admin

Banco: pesquisa_satisfacao

MongoDB: localhost:27017

Usuário: admin

Senha: admin

### 4. Verificar os Logs
Se quiser ver os logs em tempo real dos containers, use o comando:

```bash
docker-compose logs -f
```

Estrutura do Projeto
Aqui está a estrutura de diretórios e arquivos do projeto:

```bash
sistema-pesquisa-satisfacao/
├── node-app/
│   └── Dockerfile               
├── postgres/
│   └── Dockerfile               
├── mongodb/
│   └── Dockerfile               
├── docker-compose.yml           
└── README.md                    
```

Descrição dos Arquivos
Dockerfiles: Contêm as instruções para construir os containers de cada serviço.

docker-compose.yml: Arquivo que orquestra os containers, configura redes, volumes e dependências.

README.md: Documento que explica como rodar e entender o sistema.

### Desenvolvimento
Se você deseja contribuir com melhorias ou testar o projeto localmente, basta seguir as instruções para rodar os containers. Caso queira rodar a aplicação fora do Docker, faça o seguinte:

```bash
npm install
npm start
```



