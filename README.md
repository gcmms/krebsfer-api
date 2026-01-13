# Krebsfer Migration Runner

Aplicacao isolada para rodar migrations do Prisma com uma interface visual simples.

## Como usar

1. Copie `.env.example` para `.env` e ajuste o `DATABASE_URL`.
2. Instale dependencias:
   ```bash
   npm install
   ```
3. Suba o servico:
   ```bash
   npm start
   ```
4. Acesse `http://localhost:3005` e clique em **Rodar migrations**.

## Observacoes

- Usa o schema e migrations em `prisma/`.
- Rode apenas quando precisar atualizar o banco e depois derrube o app.
