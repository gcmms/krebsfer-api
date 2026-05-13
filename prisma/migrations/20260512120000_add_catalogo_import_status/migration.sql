CREATE TABLE "CatalogoImportStatus" (
    "id" TEXT NOT NULL DEFAULT 'catalogo',
    "lastSuccessfulImportAt" TIMESTAMP(3) NOT NULL,
    "totalItens" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CatalogoImportStatus_pkey" PRIMARY KEY ("id")
);
