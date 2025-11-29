# Krebsfer API (NestJS + Prisma + PostgreSQL)

API para gestão de Revendas e Usuários da Krebsfer, com autenticação JWT (access + refresh), controle de permissões por role e documentação Swagger.

## Stack
- NestJS
- Prisma ORM + PostgreSQL
- JWT (access 15m / refresh 7d)
- bcrypt para hash de senha
- class-validator / class-transformer
- Swagger habilitado

## Pré-requisitos
- Node.js 18+
- PostgreSQL rodando e acessível

## Instalação
```bash
cd krebsfer-api
npm install
```

## Configuração de ambiente
Crie um arquivo `.env` na raiz (existe um exemplo já preenchido):
```
DATABASE_URL="postgresql://user:password@localhost:5432/krebsfer"
PORT=3000
JWT_SECRET="supersecretjwt"
JWT_REFRESH_SECRET="supersecretrefresh"
JWT_EXPIRES_IN="15m"
JWT_REFRESH_EXPIRES_IN="7d"
SALT_ROUNDS=10
```

## Prisma
Gerar cliente e rodar migração inicial:
```bash
npx prisma generate
npx prisma migrate dev --name init
```
- A migração inicial insere um administrador padrão: `admin@admin.com` / `123456`.

## Executar a API
Desenvolvimento (hot-reload):
```bash
npm run start:dev
```

Build + produção local:
```bash
npm run build
npm start
```

## Swagger
- URL: `http://localhost:3000/v1/docs`
- Autenticação Bearer para rotas protegidas

## Endpoints principais
- Auth: `/v1/auth/register`, `/v1/auth/login`, `/v1/auth/refresh`
- Users: CRUD completo com restrições por role (ADMIN / GERENTE_REVENDA), `/v1/users/me`
- Revendas: CRUD com municípios de atuação e vinculação de usuários

Roles oficiais: `ADMIN`, `GERENTE_REVENDA`, `USUARIO_REVENDA`.

## Observações
- PrismaService é global.
- As rotas utilizam ValidationPipe global (whitelist) e CORS habilitado.
- Revenda e usuários seguem o schema real fornecido em `prisma/schema.prisma`.
