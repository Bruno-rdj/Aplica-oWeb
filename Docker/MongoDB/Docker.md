## **TF - Matéria: Banco de Dados - Professor Gustavo**
Atividade prática desenvolvida para a matéria de Banco de Dados, onde realizamos operações de inserção, consulta, atualização e exclusão de dados em MongoDB. A atividade incluiu o uso de comandos como insertMany, find, updateOne e deleteOne, com foco na manipulação de coleções de clientes, processos e eventos.

## **Exercício 1: Inserindo Dados**

### 1. **Clientes**
   Para inserir dados na coleção de clientes, use o seguinte comando:
   ```javascript
   db.client.insertMany([
     {
       "full_name": "Maria Silva",
       "cpf": "12345678901",
       "email": "maria.silva@email.com",
       "phone": "11987654321",
       "address": "Rua das Flores, 123",
       "city": "São Paulo",
       "state": "SP",
       "zip_code": "01001000",
       "created_by": "user_id_do_admin_1",
       "enterprise": null,
       "cnpj_enterprise": null,
       "description": "Cliente individual"
     },
     {
       "full_name": "Empresa Soluções Ltda",
       "cpf": null,
       "email": "contato@solucoes.com.br",
       "phone": "21998765432",
       "address": "Avenida Principal, 456",
       "city": "Rio de Janeiro",
       "state": "RJ",
       "zip_code": "20010020",
       "created_by": "user_id_do_manager_2",
       "enterprise": "Soluções Ltda",
       "cnpj_enterprise": "12345678000190",
       "description": "Cliente corporativo"
     }
   ]);
   ```

### 2. **Processos**
   Para registrar os processos relacionados aos clientes na coleção `client_processes`, utilize:
   ```javascript
   db.client_processes.insertMany([
     {
       "client_id": "id_do_cliente_maria_silva",
       "number": "PROC-2023-001",
       "value": 1500.00,
       "status": "ativo",
       "class": "Cobrança",
       "description": "Processo de cobrança referente a fatura em aberto.",
       "created_at": ISODate("2023-10-26T10:00:00Z")
     },
     {
       "client_id": "id_do_cliente_empresa_solucoes",
       "number": "PROC-2023-002",
       "value": 5500.50,
       "status": "em análise",
       "class": "Contratual",
       "description": "Análise de contrato de prestação de serviços.",
       "created_at": ISODate("2023-11-15T14:30:00Z")
     }
   ]);
   ```

### 3. **Eventos**
   Para inserir eventos relacionados aos clientes, utilize:
   ```javascript
   db.events.insertMany([
     {
       "client_id": "id_do_cliente_maria_silva",
       "enterprise": null,
       "cnpj_enterprise": null,
       "freight": 50.00,
       "amount_of_cleaning": 2,
       "cleaning_date": "2023-12-10",
       "cost_of_each_cleaning": 200.00,
       "proposal_doc": "PROP-MS-001.pdf",
       "number_proposal": "PROP-2023-001-MS",
       "proposal_expiration_date": ISODate("2023-11-30T23:59:59Z"),
       "created_proposal_by": "user_id_do_sales_3",
       "address": "Rua das Camélias, 789",
       "city": "São Paulo",
       "state": "SP",
       "zip_code": "02002000",
       "proposal_status": "accepted"
     },
     {
       "client_id": "id_do_cliente_empresa_solucoes",
       "enterprise": "Soluções Ltda",
       "cnpj_enterprise": "12345678000190",
       "freight": 120.00,
       "amount_of_cleaning": 5,
       "cleaning_date": "2024-01-15",
       "cost_of_each_cleaning": 150.00,
       "proposal_doc": "PROP-ESL-002.pdf",
       "number_proposal": "PROP-2023-002-ESL",
       "proposal_expiration_date": ISODate("2023-12-20T23:59:59Z"),
       "created_proposal_by": "user_id_do_sales_3",
       "address": "Avenida das Palmeiras, 1011",
       "city": "Rio de Janeiro",
       "state": "RJ",
       "zip_code": "22020030",
       "proposal_status": "pending accepted"
     }
   ]);
   ```

---

## **Exercício 2: Consultando Dados**

### 1. **Clientes em São Paulo**  
   Para listar todos os clientes que estão na cidade de São Paulo, utilize:
   ```javascript
   db.client.find({city: {$eq: "São Paulo"}});
   ```

### 2. **Processos com Valor Superior a 2000**  
   Para listar os processos cujo valor é superior a 2000, utilize:
   ```javascript
   db.client_processes.find({value: {$gt: 2000.0}});
   ```

### 3. **Eventos com Proposta Pendente ou Aceita**  
   Para encontrar os eventos com status de proposta "pending accepted" ou "accepted", utilize:
   ```javascript
   db.events.find({proposal_status: {$in: ["pending accepted", "accepted"]}});
   ```

### 4. **Clientes Corporativos**  
   Para listar clientes corporativos (onde o campo `enterprise` não é nulo) e exibir apenas o nome e o CNPJ, use:
   ```javascript
   db.client.find(
     {enterprise: { $ne: null }},
     {full_name: 1, cnpj_enterprise: 1, _id: 0}
   );
   ```

### 5. **Processos de Cobrança**  
   Para listar processos da classe "Cobrança" e ordená-los por valor de forma decrescente, utilize:
   ```javascript
   db.client_processes.find({class: "Cobrança"}).sort({value: -1});
   ```

---

## **Exercício 3: Atualizando Dados**

### 1. **Atualizar Status do Processo**  
   Para alterar o status do processo com o número "PROC-2023-001" para "concluído", use:
   ```javascript
   db.client_processes.updateOne(
     {number: "PROC-2023-001"}, 
     {$set: {status: "concluído"}}
   );
   ```

### 2. **Adicionar Observação ao Evento**  
   Para adicionar a observação "OBS-MS-001.txt" ao evento de Maria Silva, utilize:
   ```javascript
   db.events.updateOne(
     {client_id: "id_do_cliente_maria_silva"},
     {$set: {note_doc: "OBS-MS-001.txt"}}
   );
   ```

### 3. **Incrementar Quantidade de Limpezas**  
   Para aumentar em 1 o número de limpezas para a Empresa Soluções Ltda, use:
   ```javascript
   db.events.updateOne(
     {client_id: "id_do_cliente_empresa_solucoes"}, 
     {$inc: {amount_of_cleaning: 1}}
   );
   ```

---

## **Exercício 4: Excluindo Dados**

### 1. **Remover Processo**  
   Para excluir o processo com número "PROC-2023-002", use:
   ```javascript
   db.client_processes.deleteOne({number: "PROC-2023-002"});
   ```

### 2. **Visualizar Índices**  
   Para listar todos os índices da coleção `client`, utilize:
   ```javascript
   db.client.getIndexes();
   ```
