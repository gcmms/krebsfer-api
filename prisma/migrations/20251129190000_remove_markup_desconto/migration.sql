-- Drop unused commercial fields
ALTER TABLE "Revenda"
DROP COLUMN "markupPadrao",
DROP COLUMN "descontoMaximo";
