# **Dockerfile para Node.js**

## **Descrição**
Este arquivo `Dockerfile` é utilizado para criar uma imagem Docker personalizada para rodar uma aplicação Node.js. Ele configura o ambiente de desenvolvimento baseado na versão 22 do Node.js, instala as dependências da aplicação e expõe a porta padrão para execução da aplicação web.

## **Objetivo**
Ao usar esse `Dockerfile`, você criará uma imagem Docker que configura automaticamente o ambiente necessário para executar uma aplicação Node.js, copiando as dependências, instalando pacotes necessários e iniciando o servidor na porta 3000.

## **Estrutura do Dockerfile**

### **Imagem Base**
```dockerfile
FROM node:22
```
Aqui, estamos utilizando a imagem oficial do Node.js na versão 22. Esta imagem já inclui tudo o que é necessário para rodar aplicações Node.js, o que facilita o processo de configuração do ambiente no Docker.

### **Diretório de Trabalho**
```dockerfile
WORKDIR /usr/src/app
```
A instrução `WORKDIR` define o diretório de trabalho dentro do container. Nesse caso, estamos usando `/usr/src/app`, que será onde os arquivos da aplicação serão armazenados e executados.

### **Cópia de Dependências**
```dockerfile
COPY ./src/package*.json ./
```
A linha acima copia os arquivos `package.json` e `package-lock.json` da pasta `src` do seu projeto para o diretório de trabalho dentro do container. Esses arquivos são essenciais para gerenciar as dependências da aplicação.

### **Instalação de Dependências**
```dockerfile
RUN npm install
```
Aqui, usamos o comando `RUN` para executar o `npm install` dentro do container, instalando todas as dependências listadas no `package.json` e `package-lock.json`.

### **Cópia do Código-Fonte**
```dockerfile
COPY ./src/ ./
```
Este comando copia todos os arquivos de código-fonte da pasta `src` para o diretório de trabalho dentro do container. Isso inclui os arquivos da sua aplicação Node.js, como arquivos JavaScript e outros recursos necessários para a execução.

### **Exposição da Porta**
```dockerfile
EXPOSE 3000
```
A instrução `EXPOSE` informa que a aplicação no container irá escutar a porta `3000`. Essa é a porta padrão onde aplicações Node.js costumam rodar, permitindo que o tráfego seja redirecionado do host para o container.

### **Comando Padrão**
```dockerfile
CMD ["node", "app.js"]
```
A instrução `CMD` define o comando que será executado quando o container for iniciado. Nesse caso, estamos informando que o Node.js deve rodar o arquivo `app.js` como o ponto de entrada para a aplicação.

## **Como Executar**

### **Passo 1: Construir a Imagem Docker**
No diretório onde o arquivo `Dockerfile` está localizado, execute o seguinte comando para construir a imagem Docker:

```bash
docker build -t custom-nodejs .
```
Isso criará a imagem Docker com o nome `custom-nodejs`. O comando `docker build` irá buscar o `Dockerfile` e gerar a imagem com base na configuração.

### **Passo 2: Executar o Container**
Após a criação da imagem, execute o container com o seguinte comando:

```bash
docker run -d --name nodejs-container -p 3000:3000 custom-nodejs
```
**Explicação dos parâmetros:**

- `-d`: Executa o container em segundo plano.
- `--name nodejs-container`: Dá um nome ao container, o que facilita sua identificação.
- `-p 3000:3000`: Mapeia a porta `3000` do host para a porta `3000` do container, permitindo que você acesse a aplicação a partir do seu navegador.
- `custom-nodejs`: Nome da imagem que foi construída anteriormente.

### **Passo 3: Acessar a Aplicação**
Depois de executar o container, a aplicação estará disponível em `http://localhost:3000`. Você pode acessar a interface da sua aplicação Node.js diretamente do seu navegador ou usando ferramentas como Postman, caso seja uma API.

## **Observação Importante**
Certifique-se de que o arquivo `app.js` seja realmente o ponto de entrada da sua aplicação. Caso o arquivo tenha outro nome ou esteja localizado em outro diretório, você precisará alterar a linha do `CMD` para refletir o caminho correto. Além disso, verifique se todas as dependências necessárias estão corretamente listadas no `package.json` para evitar problemas na hora da execução.

---

### **Melhorias Possíveis**
Aqui estão algumas melhorias que podem ser feitas no `Dockerfile` para aumentar a segurança e a flexibilidade:

1. **Persistência de Dados:** Se sua aplicação utiliza banco de dados ou arquivos locais, considere a utilização de volumes Docker para persistir esses dados fora do container.
   ```yaml
   volumes:
     - /usr/src/app/data:/data
   ```

2. **Imagens Personalizadas para Produção:** Em um ambiente de produção, você pode querer criar uma imagem mais enxuta, removendo ferramentas de desenvolvimento ou utilizando uma imagem mais otimizada. Uma boa alternativa é usar uma imagem baseada em `node:alpine`, que é muito mais leve.

3. **Uso de Docker Compose:** Se sua aplicação Node.js interage com outros containers (como bancos de dados), você pode usar o Docker Compose para facilitar a orquestração dos containers. O Docker Compose permite configurar múltiplos containers e suas interações de forma simplificada.

4. **Melhoria no Gerenciamento de Dependências:** Utilize o `npm ci` em vez de `npm install` para instalações de dependências mais rápidas e confiáveis em ambientes de CI/CD. O `npm ci` garante que a instalação seja exatamente como definida no `package-lock.json`, evitando discrepâncias.

