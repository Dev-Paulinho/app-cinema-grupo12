# 🎬 Aplicativo de Cinema — Grupo 12

![React Native](https://img.shields.io/badge/Frontend-React%20Native%20%2F%20Expo-61DAFB?logo=react)
![Node.js](https://img.shields.io/badge/Backend-Node.js%20%2F%20Express-339933?logo=node.js)
![PostgreSQL](https://img.shields.io/badge/Banco%20de%20Dados-PostgreSQL-336791?logo=postgresql)

Projeto acadêmico desenvolvido para a disciplina de **Análise e Desenvolvimento de Sistemas**, com o objetivo de criar um aplicativo mobile que centraliza trailers, sinopses, avaliações, programação de cinemas locais e compra de ingressos.

📹 Um vídeo demonstrativo do projeto está disponível em [`Video Pitch.mp4`](./Video%20Pitch.mp4).

---

## 📑 Sumário

- [Objetivo](#-objetivo)
- [Proof of Concept (PoC)](#-proof-of-concept-poc)
- [Tecnologias utilizadas](#-tecnologias-utilizadas)
- [Estrutura do repositório](#-estrutura-do-repositório)
- [Pré-requisitos](#-pré-requisitos)
- [Como rodar o projeto](#-como-rodar-o-projeto)
- [Equipe](#-equipe)
- [Licença](#-licença)

---

## 🎯 Objetivo

Aplicativo mobile para centralizar trailers, sinopses, avaliações, programação de cinemas locais e compra de ingressos.

## 🧪 Proof of Concept (PoC)

### Objetivo da PoC
Demonstrar a viabilidade do aplicativo por meio da implementação de um fluxo baseado na jornada de um usuário que deseja encontrar filmes nacionais, consultar informações sobre um filme de interesse e visualizar suas sessões disponíveis.

### Escopo da PoC
- Exibição de filmes em cartaz
- Filtro de filmes nacionais
- Visualização de informações de um filme
- Consulta de sessões

### Dados utilizados
Para evitar a necessidade de integração com APIs externas de filmes, cinemas ou geolocalização, os dados de filmes e sessões são cadastrados diretamente no banco de dados do aplicativo.

---

## 🛠 Tecnologias utilizadas

**Frontend**
- [React Native](https://reactnative.dev/) (0.86) + [React 19](https://react.dev/)
- [Expo](https://expo.dev/) SDK 57, com [Expo Router](https://docs.expo.dev/router/introduction/)
- [TypeScript](https://www.typescriptlang.org/)

**Backend**
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/) 5
- [PostgreSQL](https://www.postgresql.org/) (via driver [`pg`](https://node-postgres.com/), sem ORM — queries SQL diretas)

---

## 📂 Estrutura do repositório

```
app-cinema-grupo12/
├── backend/          # API em Node.js + Express, conexão com PostgreSQL
├── frontend/         # Aplicativo mobile em React Native (Expo)
├── Video Pitch.mp4   # Vídeo de apresentação do projeto
└── README.md
```

---

## ✅ Pré-requisitos

Antes de começar, tenha instalado na sua máquina:

- [Node.js](https://nodejs.org/) (versão 18 ou superior recomendada)
- [npm](https://www.npmjs.com/) (instalado junto com o Node.js)
- App [Expo Go](https://expo.dev/client) instalado no celular (Android/iOS) **ou** um emulador Android/iOS configurado, para visualizar o app mobile

> O backend já vem configurado para se conectar a um banco de dados PostgreSQL hospedado no [Supabase](https://supabase.com/), então **não é necessário instalar PostgreSQL localmente**.

---

## 🚀 Como rodar o projeto

### 1. Clonar o repositório

```bash
git clone https://github.com/Dev-Paulinho/app-cinema-grupo12.git
cd app-cinema-grupo12
```

### 2. Configurar e rodar o Backend

```bash
cd backend
npm install
node index.js
```

Se tudo estiver certo, o terminal deve exibir:
```
🚀 Servidor rodando na porta 3000
🔌 Conectado ao banco de dados Supabase!
```

A API ficará disponível em `http://localhost:3000`, com as rotas:
- `GET /api/filmes` — lista todos os filmes (aceita `?nacional=true` para filtrar só nacionais)
- `GET /api/filmes/:id` — detalhes de um filme específico
- `GET /api/sessoes?filmeId=ID` — sessões disponíveis para um filme

### 3. Configurar e rodar o Frontend

Em um novo terminal:

```bash
cd frontend
npm install
npx expo start
```

Após o comando acima, abra o app **Expo Go** no celular e escaneie o QR Code exibido no terminal (ou pressione `a` para abrir no emulador Android, `i` para iOS).

---

## 👥 Equipe

- Gustavo Oliveira Arao da Silva
- Lucas Gabriel de Almeida Pereira
- Marta Francisca Pego dos Santos
- Paulo Victor Silva
- Pedro Henrique Leite Melo

---

## 📄 Licença

Projeto acadêmico desenvolvido para fins educacionais, sem fins comerciais.
