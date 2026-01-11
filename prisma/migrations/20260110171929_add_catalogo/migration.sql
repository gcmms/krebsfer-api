-- CreateTable
CREATE TABLE "CatalogoCategoria" (
    "nome" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CatalogoCategoria_pkey" PRIMARY KEY ("nome")
);

-- CreateTable
CREATE TABLE "CatalogoSubcategoria" (
    "categoriaNome" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CatalogoSubcategoria_pkey" PRIMARY KEY ("categoriaNome","nome")
);

-- CreateTable
CREATE TABLE "CatalogoPeca" (
    "itemCode" TEXT NOT NULL,
    "itemName" TEXT NOT NULL,
    "price" DECIMAL(12,3) NOT NULL,
    "salUnitMsr" TEXT,
    "ncmCode" TEXT,
    "categoriaNome" TEXT NOT NULL,
    "subcategoriaNome" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CatalogoPeca_pkey" PRIMARY KEY ("itemCode")
);

-- CreateIndex
CREATE INDEX "CatalogoPeca_categoriaNome_subcategoriaNome_idx" ON "CatalogoPeca"("categoriaNome", "subcategoriaNome");

-- AddForeignKey
ALTER TABLE "CatalogoSubcategoria" ADD CONSTRAINT "CatalogoSubcategoria_categoriaNome_fkey" FOREIGN KEY ("categoriaNome") REFERENCES "CatalogoCategoria"("nome") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CatalogoPeca" ADD CONSTRAINT "CatalogoPeca_categoriaNome_fkey" FOREIGN KEY ("categoriaNome") REFERENCES "CatalogoCategoria"("nome") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CatalogoPeca" ADD CONSTRAINT "CatalogoPeca_categoriaNome_subcategoriaNome_fkey" FOREIGN KEY ("categoriaNome", "subcategoriaNome") REFERENCES "CatalogoSubcategoria"("categoriaNome", "nome") ON DELETE RESTRICT ON UPDATE CASCADE;
