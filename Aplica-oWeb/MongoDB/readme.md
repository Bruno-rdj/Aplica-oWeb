# **Dockerfile para MongoDB**

## **Descrição**
Este arquivo `Dockerfile` é utilizado para criar uma imagem Docker personalizada para o MongoDB, configurando um ambiente inicial com credenciais administrativas e expondo a porta padrão para conexões externas. O MongoDB é um banco de dados NoSQL muito popular e amplamente utilizado para armazenar dados não estruturados ou semi-estruturados.

## **Objetivo**
Ao usar esse `Dockerfile`, você terá uma imagem do MongoDB configurada para inicializar automaticamente com um usuário e senha administrativos. Ele também permite a execução de scripts de inicialização, caso queira configurar o banco de dados de forma mais personalizada. 

## **Estrutura do Dockerfile**

### **Imagem Base**
```dockerfile
FROM mongo:latest
```
Aqui, estamos utilizando a imagem oficial mais recente do MongoDB (`mongo:latest`). Essa imagem já contém a configuração básica para rodar o MongoDB, tornando o processo de criação de um ambiente Dockerizado muito mais simples.

### **Configuração de Credenciais**
```dockerfile
ENV MONGO_INITDB_ROOT_USERNAME=admin
ENV MONGO_INITDB_ROOT_PASSWORD=adminpassword
```
Estas variáveis de ambiente são usadas para configurar as credenciais administrativas do MongoDB. No exemplo, o **usuário** é `admin` e a **senha** é `adminpassword`. Essas credenciais serão usadas para acessar o MongoDB logo após o container ser iniciado.

### **Exposição da Porta**
```dockerfile
EXPOSE 27017
```
A instrução `EXPOSE` é utilizada para indicar que o container estará ouvindo na porta `27017`, que é a porta padrão para conexões do MongoDB. Isso permite que você acesse o banco de dados a partir de outros containers ou diretamente da sua máquina local.

#### **Scripts de Inicialização (Opcional)**
```dockerfile
# COPY ./init-scripts /docker-entrypoint-initdb.d/
```
Essa linha está comentada, mas pode ser usada caso você queira incluir scripts de inicialização personalizados. Os scripts colocados no diretório `init-scripts` serão executados automaticamente durante a inicialização do MongoDB no container. Isso pode ser útil para configurar coleções iniciais, dados padrão ou até mesmo permissões no banco.

## **Como Executar**

### **Passo 1: Construir a Imagem Docker**
No diretório onde o arquivo `Dockerfile` está localizado, execute o seguinte comando para construir a imagem Docker:

```bash
docker build -t custom-mongodb .
```
Aqui, `custom-mongodb` é o nome que estamos atribuindo à nossa imagem. Esse comando vai criar a imagem baseada no `Dockerfile` configurado.

#### **Passo 2: Executar o Container**
Após a criação da imagem, execute o container com o seguinte comando:

```bash
docker run -d --name mongodb-container -p 27017:27017 custom-mongodb
```
**Explicação dos parâmetros:**

- `-d`: Executa o container em segundo plano.
- `--name mongodb-container`: Define um nome personalizado para o container (`mongodb-container`).
- `-p 27017:27017`: Mapeia a porta 27017 do host para a porta 27017 do container, permitindo que você acesse o MongoDB externamente.
- `custom-mongodb`: Nome da imagem que foi construída no passo anterior.

### **Passo 3: Conectar-se ao MongoDB**
Agora, você pode acessar o MongoDB com qualquer cliente, como `mongosh`, `MongoDB Compass`, ou até mesmo uma aplicação que se conecte ao banco de dados. Use o endereço `localhost:27017` e as credenciais definidas no Dockerfile:

- **Usuário:** `admin`
- **Senha:** `adminpassword`

### **Passo 4: (Opcional) Adicionar Scripts de Inicialização**
Caso queira configurar o banco de dados de forma personalizada, descomente a linha do `COPY` e adicione scripts SQL ou JavaScript no diretório `init-scripts`. Esses scripts serão executados automaticamente na inicialização do MongoDB.

Para usar essa funcionalidade:

1. Crie a pasta `init-scripts` no mesmo diretório onde está o `Dockerfile`.
2. Coloque seus scripts de inicialização nessa pasta.
3. Recrie a imagem e reinicie o container:

```bash
docker build -t custom-mongodb .
docker run -d --name mongodb-container -p 27017:27017 custom-mongodb
```

## **Observação Importante**
É essencial alterar as credenciais padrão (admin/adminpassword) para algo mais seguro, especialmente em ambientes de produção. Além disso, em ambientes de produção, considere usar um volume para persistir os dados do MongoDB e evitar a perda de dados caso o container seja removido.

---

### **Melhorias Possíveis**
Para garantir maior segurança e flexibilidade, aqui estão algumas melhorias que podem ser feitas no `Dockerfile`:

1. **Persistência de Dados:** Utilize volumes para garantir que os dados do MongoDB sejam preservados mesmo após reiniciar ou remover o container:
   ```yaml
   volumes:
     - mongo-data:/data/db
   ```

2. **Imagens Personalizadas para Produção:** Em ambientes de produção, você pode querer construir imagens mais leves ou adicionar configurações específicas para otimização de desempenho e segurança.

3. **Utilização de Secrets:** Para segurança extra, em vez de armazenar credenciais diretamente no `Dockerfile`, você pode usar **Docker Secrets** ou variáveis de ambiente configuradas em arquivos `.env` para armazenar dados sensíveis de maneira mais segura.


