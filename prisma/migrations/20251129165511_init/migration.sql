-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'GERENTE_REVENDA', 'USUARIO_REVENDA');

-- CreateTable
CREATE TABLE "Revenda" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "cnpjCpf" TEXT NOT NULL,
    "inscricaoEstadual" TEXT,
    "dataCadastro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "markupPadrao" DOUBLE PRECISION NOT NULL,
    "descontoMaximo" DOUBLE PRECISION NOT NULL,
    "emailPrincipal" TEXT NOT NULL,
    "emailContato" TEXT,
    "telefoneFixo" TEXT,
    "telefoneContato" TEXT,
    "enderecoCompleto" TEXT NOT NULL,
    "aliquotaDesconto" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "comissao" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Revenda_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MunicipioAtuacao" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "revendaId" TEXT NOT NULL,

    CONSTRAINT "MunicipioAtuacao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "telefone" TEXT,
    "dataNasc" TIMESTAMP(3),
    "role" "UserRole" NOT NULL DEFAULT 'USUARIO_REVENDA',
    "revendaId" TEXT,
    "refreshToken" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "MunicipioAtuacao" ADD CONSTRAINT "MunicipioAtuacao_revendaId_fkey" FOREIGN KEY ("revendaId") REFERENCES "Revenda"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_revendaId_fkey" FOREIGN KEY ("revendaId") REFERENCES "Revenda"("id") ON DELETE SET NULL ON UPDATE CASCADE;
