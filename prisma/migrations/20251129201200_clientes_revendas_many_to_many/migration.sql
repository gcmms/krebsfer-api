-- Create join table for Cliente <-> Revenda many-to-many
CREATE TABLE "_ClienteRevendas" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

CREATE UNIQUE INDEX "_ClienteRevendas_AB_unique" ON "_ClienteRevendas"("A", "B");
CREATE INDEX "_ClienteRevendas_B_index" ON "_ClienteRevendas"("B");

ALTER TABLE "_ClienteRevendas" ADD CONSTRAINT "_ClienteRevendas_A_fkey" FOREIGN KEY ("A") REFERENCES "Cliente"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "_ClienteRevendas" ADD CONSTRAINT "_ClienteRevendas_B_fkey" FOREIGN KEY ("B") REFERENCES "Revenda"("id") ON DELETE CASCADE ON UPDATE CASCADE;
