-- CreateEnum
CREATE TYPE "OrcamentoStatus" AS ENUM ('RASCUNHO', 'APROVADO', 'PEDIDO_CRIADO_SAP', 'FINALIZADO');

-- CreateTable
CREATE TABLE "Orcamento" (
    "id" TEXT NOT NULL,
    "numeroOrcamento" TEXT NOT NULL,
    "versao" INTEGER NOT NULL DEFAULT 1,
    "status" "OrcamentoStatus" NOT NULL DEFAULT 'RASCUNHO',
    "comissionado" BOOLEAN NOT NULL DEFAULT false,
    "referenciaPedido" TEXT,
    "observacoes" TEXT,
    "numeroPedidoSap" TEXT,
    "total" DECIMAL(14,2) NOT NULL,
    "clienteId" TEXT NOT NULL,
    "revendaId" TEXT NOT NULL,
    "createdById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Orcamento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrcamentoItem" (
    "id" TEXT NOT NULL,
    "orcamentoId" TEXT NOT NULL,
    "itemCode" TEXT NOT NULL,
    "itemName" TEXT NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "precoCheio" DECIMAL(12,3) NOT NULL,
    "precoDesconto" DECIMAL(12,3) NOT NULL,
    "imposto01" DECIMAL(12,3) NOT NULL,
    "imposto02" DECIMAL(12,3) NOT NULL,
    "imposto03" DECIMAL(12,3) NOT NULL,
    "precoFinal" DECIMAL(12,3) NOT NULL,

    CONSTRAINT "OrcamentoItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Orcamento_numeroOrcamento_key" ON "Orcamento"("numeroOrcamento");

-- CreateIndex
CREATE INDEX "Orcamento_clienteId_idx" ON "Orcamento"("clienteId");

-- CreateIndex
CREATE INDEX "Orcamento_revendaId_idx" ON "Orcamento"("revendaId");

-- CreateIndex
CREATE INDEX "OrcamentoItem_orcamentoId_idx" ON "OrcamentoItem"("orcamentoId");

-- AddForeignKey
ALTER TABLE "Orcamento" ADD CONSTRAINT "Orcamento_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Orcamento" ADD CONSTRAINT "Orcamento_revendaId_fkey" FOREIGN KEY ("revendaId") REFERENCES "Revenda"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Orcamento" ADD CONSTRAINT "Orcamento_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrcamentoItem" ADD CONSTRAINT "OrcamentoItem_orcamentoId_fkey" FOREIGN KEY ("orcamentoId") REFERENCES "Orcamento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
