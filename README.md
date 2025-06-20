# Avaliação Técnica Projeto NestJS + Angular - Cadastro e Listagem de Produtos

## ✨ Objetivo

Este projeto fullstack tem como objetivo fornecer uma aplicação completa para cadastro e listagem de produtos, utilizando:

* Backend com **NestJS**
* Banco de dados **PostgreSQL** (com suporte a Docker)
* Frontend com **Angular** e **Angular Material**
* Upload de imagens com salvamento no disco local
* Documentação da API com **Swagger**

---

## 📊 Funcionalidades

### API Backend

* **POST /products**: Cadastra um novo produto com os seguintes dados:

  * `nome` (string)
  * `descricao` (string)
  * `preco` (number)
  * `categoria` (string)
  * `imagem` (upload de arquivo - multipart/form-data)

* A imagem é salva no disco local e seu caminho é armazenado no banco.

* A API é documentada com Swagger: [http://localhost:5050/api](http://localhost:5050/api)

### Frontend Angular

* Lista todos os produtos com nome, descrição, preço e imagem.
* Permite acessar a rota de detalhes de um produto (`/product/:id`).
* Permite cadastrar um novo produto por um modal estilizado com tema escuro.
* Utiliza rotas lazy load e meta tags dinâmicas (SEO básico).

---

## 🚀 Instruções de Execução

### ♰ Backend (NestJS)

#### 1. Configuração do ambiente

Crie um arquivo `.env` baseado no `.env.example`:

```env
PORT=5050
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=produtos
```

#### 2. Usando Docker para PostgreSQL

Crie ou use o seguinte `docker-compose.yml`:

```yaml
version: '3.8'

services:
  db:
    image: postgres:16
    container_name: postgres_db
    restart: always
    ports:
      - "${DB_PORT}:5432"
    environment:
      POSTGRES_USER: ${DB_USERNAME}
      POSTGRES_PASSWORD: ${DB_PASSWORD}
      POSTGRES_DB: ${DB_NAME}
    volumes:
      - pgdata:/var/lib/postgresql/data
    env_file:
      - .env

  app:
    build: .
    container_name: nest_app
    restart: always
    ports:
      - "${PORT}:5050"
    depends_on:
      - db
    env_file:
      - .env
    volumes:
      - .:/usr/src/app
    command: npm run start:dev

volumes:
  pgdata:
```

Suba o container:

```bash
docker-compose up -d
```

#### 3. Instale dependências e rode o servidor

```bash
cd backend
npm install
npm run start:dev
```

Acesse: [http://localhost:5050/api](http://localhost:5050/api)

As imagens serão salvas por padrão em uma pasta `uploads/`.

---

### ♻ Frontend (Angular)

#### 1. Instale as dependências e rode o projeto

```bash
cd frontend
npm install
npm start
```

Acesse: [http://localhost:4200](http://localhost:4200)

#### 2. Funcionalidades:

* Listagem de produtos na homepage
* Botão flutuante para cadastro
* Formulário em modal com upload de imagem
* Detalhes completos de produto em `/product/:id`

---

Claro! Vamos adicionar uma seção no `README.md` explicando **como testar o endpoint de criação de produto usando o Postman**, incluindo o método, URL, tipo de body e exemplo de dados. Aqui está o trecho que você pode colar no final do README:

---

### 🧪 Testando o Cadastro de Produto com Postman

Você pode testar o endpoint `POST /products` utilizando o **Postman** ou qualquer outra ferramenta de API.

#### 📮 Endpoint

* **URL:** `http://localhost:5050/products`
* **Método:** `POST`
* **Tipo de Body:** `form-data`

#### 📤 Campos esperados:

| Campo     | Tipo   | Obrigatório | Observações                       |
| --------- | ------ | ----------- | --------------------------------- |
| nome      | string | ✅           | Nome do produto                   |
| descricao | string | ✅           | Descrição do produto              |
| preco     | number | ✅           | Valor numérico (ex: 199.99)       |
| categoria | string | ✅           | Categoria do produto              |
| imagem    | file   | ❌           | Arquivo de imagem (JPG, PNG, etc) |

#### 🖼 Exemplo de requisição (form-data):

| Key       | Value                     | Type |
| --------- | ------------------------- | ---- |
| nome      | Mouse Gamer RGB           | Text |
| descricao | Mouse com 6 botões extras | Text |
| preco     | 199.99                    | Text |
| categoria | Acessórios                | Text |
| imagem    | *(selecione um arquivo)*  | File |

> ⚠️ **Certifique-se de que o `Content-Type` seja `multipart/form-data`**, o Postman faz isso automaticamente ao usar o `form-data`.

---

## 📌 Implementações Extras

* Componente reutilizável `ProductCard`
* Rotas com **lazy loading**
* **Meta tags dinâmicas** no Angular com `Title` e `Meta`
* Estilo escuro unificado com SCSS customizado


---

## ⚙ Requisitos

* Node.js v18+
* Docker (opcional para banco de dados)
* Angular CLI e NestJS CLI instalados globalmente (recomendado):

```bash
npm i -g @nestjs/cli @angular/cli
```

---
