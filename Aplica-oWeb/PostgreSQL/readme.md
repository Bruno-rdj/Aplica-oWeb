# **Dockerfile para PostgreSQL**

## **Descrição**
Este arquivo `Dockerfile` é utilizado para criar uma imagem Docker personalizada para rodar o PostgreSQL. Ele configura um ambiente básico para a execução do banco de dados PostgreSQL com credenciais administrativas e um banco de dados inicial pré-configurado.

## **Objetivo**
O objetivo desse `Dockerfile` é configurar automaticamente um ambiente PostgreSQL com um banco de dados inicial, credenciais de acesso padrão e a possibilidade de executar scripts de inicialização opcionais para configurar o banco de dados de forma automatizada.

## **Estrutura do Dockerfile**

### **Imagem Base**
```dockerfile
FROM postgres:latest
```
Este comando utiliza a imagem oficial mais recente do PostgreSQL como base. A imagem do PostgreSQL contém tudo o que é necessário para rodar o banco de dados, incluindo a versão mais recente do PostgreSQL e a configuração básica.

### **Configuração de Credenciais**
```dockerfile
ENV POSTGRES_USER=admin
ENV POSTGRES_PASSWORD=admin_password
```
As variáveis de ambiente `POSTGRES_USER` e `POSTGRES_PASSWORD` são usadas para definir as credenciais administrativas do PostgreSQL:

- **Usuário**: `admin`
- **Senha**: `admin_password`

Essas credenciais serão usadas para criar o usuário administrador no banco de dados PostgreSQL logo ao iniciar o container.

### **Banco de Dados Inicial**
```dockerfile
ENV POSTGRES_DB=satisfaction_survey
```
A variável de ambiente `POSTGRES_DB` define o nome do banco de dados que será criado automaticamente quando o container for iniciado. Neste caso, o banco de dados será chamado `satisfaction_survey`.

### **Exposição da Porta**
```dockerfile
EXPOSE 5432
```
O comando `EXPOSE` informa que o PostgreSQL irá escutar na porta padrão 5432, a qual é mapeada para permitir conexões externas ao banco de dados.

### **Scripts de Inicialização (Opcional)**
```dockerfile
# COPY ./init-scripts/ /docker-entrypoint-initdb.d/
```
Esta linha está comentada, mas pode ser utilizada para copiar scripts de inicialização para o diretório `/docker-entrypoint-initdb.d/` dentro do container. Qualquer script colocado nesse diretório será executado automaticamente quando o PostgreSQL for iniciado pela primeira vez, permitindo a configuração adicional do banco de dados ou a criação de tabelas, índices, etc.

## **Como Executar**

### **Passo 1: Construir a Imagem Docker**
No diretório onde o arquivo `Dockerfile` está localizado, execute o seguinte comando para construir a imagem Docker:

```bash
docker build -t custom-postgres .
```
Este comando cria uma imagem Docker com o nome `custom-postgres` a partir do `Dockerfile` no diretório atual.

### **Passo 2: Executar o Container**
Depois de construir a imagem, execute o container com o seguinte comando:

```bash
docker run -d --name postgres-container -p 5432:5432 custom-postgres
```
**Explicação dos parâmetros:**

- `-d`: Executa o container em segundo plano (detached mode).
- `--name postgres-container`: Dá um nome ao container para facilitar a referência a ele.
- `-p 5432:5432`: Mapeia a porta 5432 do host para a porta 5432 do container, permitindo que você acesse o banco de dados do PostgreSQL localmente.

### **Passo 3: Conectar-se ao PostgreSQL**
Depois de iniciar o container, você pode se conectar ao banco de dados PostgreSQL usando um cliente como o `psql` ou uma interface gráfica como o `pgAdmin`.

- **Endereço**: `localhost:5432`
- **Usuário**: `admin`
- **Senha**: `admin_password`
- **Banco de Dados**: `satisfaction_survey`

### **(Opcional) Adicionar Scripts de Inicialização**
Se você precisar rodar scripts de inicialização, basta descomentar a linha `COPY` no `Dockerfile` e colocar seus scripts na pasta `init-scripts/`. Depois, recrie a imagem e reinicie o container com os novos scripts aplicados.

## **Observação Importante**
Em ambientes de produção, é essencial alterar as credenciais padrão (`admin/admin_password`) para algo mais seguro. Além disso, se você for usar scripts de inicialização, certifique-se de que eles estejam configurados corretamente para evitar problemas de configuração no banco de dados.

---

### **Melhorias Possíveis**

Aqui estão algumas melhorias que podem ser feitas no `Dockerfile` para otimizar e aumentar a segurança e a flexibilidade do seu ambiente de banco de dados:

1. **Alteração das Credenciais Padrão:**
   Para segurança, altere as credenciais `POSTGRES_USER` e `POSTGRES_PASSWORD` para valores mais seguros, especialmente em ambientes de produção.

2. **Persistência de Dados:**
   Em um ambiente de produção, é importante garantir que os dados armazenados no PostgreSQL não sejam perdidos quando o container for removido. Para isso, é possível mapear volumes Docker para armazenar os dados do banco de dados fora do container:
   ```yaml
   volumes:
     - postgres-data:/var/lib/postgresql/data
   ```

3. **Criação de Scripts Personalizados de Inicialização:**
   Scripts adicionais podem ser usados para criar tabelas, índices ou adicionar dados iniciais no banco de dados. Coloque esses scripts na pasta `init-scripts` e copie-os para dentro do container como mostrado na linha comentada do `Dockerfile`.

4. **Uso de Variáveis de Ambiente para Configuração de Produção:**
   Considere configurar variáveis de ambiente adicionais para cenários de produção, como definição de níveis de log, configurações de conexão segura (SSL), e outras opções do PostgreSQL que garantam maior segurança e desempenho.

5. **Uso de Docker Compose:**
   Se o PostgreSQL for parte de um ecossistema maior, como uma aplicação que inclui um frontend ou outras APIs, o uso do Docker Compose pode ser útil para orquestrar múltiplos containers e gerenciar suas dependências de forma mais eficiente.
