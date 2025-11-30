/*
  Warnings:

  - You are about to drop the `_ClienteRevendas` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ClienteRevendas" DROP CONSTRAINT "_ClienteRevendas_A_fkey";

-- DropForeignKey
ALTER TABLE "_ClienteRevendas" DROP CONSTRAINT "_ClienteRevendas_B_fkey";

-- AlterTable
ALTER TABLE "Cliente" ALTER COLUMN "updatedAt" DROP DEFAULT;

-- DropTable
DROP TABLE "_ClienteRevendas";

-- CreateTable
CREATE TABLE "_ClienteToRevenda" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ClienteToRevenda_AB_unique" ON "_ClienteToRevenda"("A", "B");

-- CreateIndex
CREATE INDEX "_ClienteToRevenda_B_index" ON "_ClienteToRevenda"("B");

-- AddForeignKey
ALTER TABLE "_ClienteToRevenda" ADD CONSTRAINT "_ClienteToRevenda_A_fkey" FOREIGN KEY ("A") REFERENCES "Cliente"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClienteToRevenda" ADD CONSTRAINT "_ClienteToRevenda_B_fkey" FOREIGN KEY ("B") REFERENCES "Revenda"("id") ON DELETE CASCADE ON UPDATE CASCADE;
