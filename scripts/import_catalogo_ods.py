#!/usr/bin/env python3
import argparse
import os
import sys
import zipfile
import xml.etree.ElementTree as ET

NS = {
    "office": "urn:oasis:names:tc:opendocument:xmlns:office:1.0",
    "table": "urn:oasis:names:tc:opendocument:xmlns:table:1.0",
    "text": "urn:oasis:names:tc:opendocument:xmlns:text:1.0",
}

EXPECTED_HEADERS = [
    "ItemCode",
    "ItemName",
    "Price",
    "SalUnitMsr",
    "NcmCode",
    "Categoria",
    "SubCategoria",
]


def _cell_text(cell):
    texts = [t.text for t in cell.findall("text:p", NS)]
    if not texts:
        return ""
    return "".join([t for t in texts if t])


def read_ods_rows(path):
    with zipfile.ZipFile(path) as zf:
        content = zf.read("content.xml")
    root = ET.fromstring(content)
    table = root.find(".//table:table", NS)
    if table is None:
        return []

    rows = []
    for row in table.findall("table:table-row", NS):
        cells = []
        for cell in row.findall("table:table-cell", NS):
            repeat = int(
                cell.get(f"{{{NS['table']}}}number-columns-repeated", "1")
            )
            value = _cell_text(cell).strip()
            cells.extend([value] * repeat)

        repeat_rows = int(
            row.get(f"{{{NS['table']}}}number-rows-repeated", "1")
        )
        for _ in range(repeat_rows):
            rows.append(cells)
    return rows


def sql_quote(value):
    if value is None:
        return "NULL"
    escaped = value.replace("'", "''")
    return f"'{escaped}'"


def write_insert(out, table, columns, rows, conflict=None, update_cols=None, chunk=500):
    if not rows:
        return

    col_list = ", ".join([f'"{c}"' for c in columns])
    for i in range(0, len(rows), chunk):
        batch = rows[i : i + chunk]
        values_sql = ",\n".join(
            [
                "(" + ", ".join(r) + ")"
                for r in batch
            ]
        )
        out.write(f"INSERT INTO \"{table}\" ({col_list}) VALUES\n{values_sql}\n")
        if conflict:
            out.write(f"ON CONFLICT ({conflict}) ")
            if update_cols:
                set_sql = ", ".join(
                    [f'"{c}" = EXCLUDED."{c}"' for c in update_cols]
                )
                out.write(f"DO UPDATE SET {set_sql};\n\n")
            else:
                out.write("DO NOTHING;\n\n")
        else:
            out.write(";\n\n")


def main():
    script_dir = os.path.dirname(os.path.abspath(__file__))
    repo_root = os.path.abspath(os.path.join(script_dir, "..", ".."))
    api_root = os.path.abspath(os.path.join(script_dir, ".."))

    parser = argparse.ArgumentParser(
        description="Gera SQL para importar o CatalogoPecas.ods no banco de dev."
    )
    parser.add_argument(
        "--input",
        default=os.path.join(repo_root, "CatalogoPecas.ods"),
        help="Caminho para o arquivo ODS (default: CatalogoPecas.ods na raiz do repo)",
    )
    parser.add_argument(
        "--output",
        default=os.path.join(api_root, "prisma", "seed", "catalogo_pecas.sql"),
        help="Caminho do SQL gerado (default: prisma/seed/catalogo_pecas.sql)",
    )
    args = parser.parse_args()

    rows = read_ods_rows(args.input)
    if not rows:
        print("Nenhuma linha encontrada no ODS.")
        return 1

    header = rows[0]
    try:
        idx = {name: header.index(name) for name in EXPECTED_HEADERS}
    except ValueError as exc:
        print("Cabeçalho não bate com o esperado:", exc)
        print("Encontrado:", header)
        return 1

    categorias = set()
    subcategorias = set()
    pecas = []

    for row in rows[1:]:
        if len(row) <= idx["ItemCode"]:
            continue
        item_code = row[idx["ItemCode"]].strip()
        if not item_code:
            continue

        item_name = row[idx["ItemName"]].strip()
        price_raw = row[idx["Price"]].strip().replace(",", ".")
        price = price_raw if price_raw else None
        sal_unit = row[idx["SalUnitMsr"]].strip() or None
        ncm_code = row[idx["NcmCode"]].strip() or None
        categoria = row[idx["Categoria"]].strip()
        subcategoria = row[idx["SubCategoria"]].strip()

        if not categoria or not subcategoria:
            continue

        if categoria:
            categorias.add(categoria)
        if categoria and subcategoria:
            subcategorias.add((categoria, subcategoria))

        pecas.append(
            {
                "itemCode": item_code,
                "itemName": item_name,
                "price": price,
                "salUnitMsr": sal_unit,
                "ncmCode": ncm_code,
                "categoriaNome": categoria,
                "subcategoriaNome": subcategoria,
            }
        )

    os.makedirs(os.path.dirname(args.output), exist_ok=True)
    with open(args.output, "w", encoding="utf-8") as out:
        out.write("BEGIN;\n\n")

        categoria_rows = [
            [sql_quote(nome), "NOW()", "NOW()"]
            for nome in sorted(categorias)
        ]
        write_insert(
            out,
            "CatalogoCategoria",
            ["nome", "createdAt", "updatedAt"],
            categoria_rows,
            conflict='"nome"',
            update_cols=["updatedAt"],
        )

        subcategoria_rows = [
            [sql_quote(cat), sql_quote(sub), "NOW()", "NOW()"]
            for cat, sub in sorted(subcategorias)
        ]
        write_insert(
            out,
            "CatalogoSubcategoria",
            ["categoriaNome", "nome", "createdAt", "updatedAt"],
            subcategoria_rows,
            conflict='"categoriaNome", "nome"',
            update_cols=["updatedAt"],
        )

        peca_rows = []
        for peca in pecas:
            price_sql = peca["price"] if peca["price"] is not None else "NULL"
            peca_rows.append(
                [
                    sql_quote(peca["itemCode"]),
                    sql_quote(peca["itemName"]),
                    price_sql,
                    sql_quote(peca["salUnitMsr"]) if peca["salUnitMsr"] else "NULL",
                    sql_quote(peca["ncmCode"]) if peca["ncmCode"] else "NULL",
                    sql_quote(peca["categoriaNome"]),
                    sql_quote(peca["subcategoriaNome"]),
                    "NOW()",
                    "NOW()",
                ]
            )

        write_insert(
            out,
            "CatalogoPeca",
            [
                "itemCode",
                "itemName",
                "price",
                "salUnitMsr",
                "ncmCode",
                "categoriaNome",
                "subcategoriaNome",
                "createdAt",
                "updatedAt",
            ],
            peca_rows,
            conflict='"itemCode"',
            update_cols=[
                "itemName",
                "price",
                "salUnitMsr",
                "ncmCode",
                "categoriaNome",
                "subcategoriaNome",
                "updatedAt",
            ],
        )

        out.write("COMMIT;\n")

    print(f"SQL gerado em {args.output}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
