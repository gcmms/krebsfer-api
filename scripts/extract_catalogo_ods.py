import json
import zipfile
import xml.etree.ElementTree as ET

ODS_PATH = "CatalogoPecas.ods"

NS = {
    "office": "urn:oasis:names:tc:opendocument:xmlns:office:1.0",
    "table": "urn:oasis:names:tc:opendocument:xmlns:table:1.0",
    "text": "urn:oasis:names:tc:opendocument:xmlns:text:1.0",
}


def get_cell_text(cell):
    parts = []
    for p in cell.findall(".//text:p", NS):
        if p.text:
            parts.append(p.text)
    return "\n".join(parts).strip()


def extract_rows(content):
    root = ET.fromstring(content)
    sheet = root.find(".//table:table", NS)
    if sheet is None:
        raise RuntimeError("No sheets found in ODS.")

    rows = []
    for row in sheet.findall("table:table-row", NS):
        row_vals = []
        for cell in row.findall("table:table-cell", NS):
            repeat = int(
                cell.get(f"{{{NS['table']}}}number-columns-repeated", "1")
            )
            value = get_cell_text(cell)
            row_vals.extend([value] * repeat)
        rows.append(row_vals)
    return rows


def main():
    with zipfile.ZipFile(ODS_PATH) as zf:
        content = zf.read("content.xml")

    rows = extract_rows(content)
    rows = [r for r in rows if any(v.strip() for v in r)]
    if not rows:
        raise RuntimeError("No data rows found in ODS.")

    header = [h.strip() for h in rows[0]]
    data_rows = rows[1:]

    items = []
    for row in data_rows:
        row = row + [""] * (len(header) - len(row))
        record = dict(zip(header, row))
        item_code = record.get("ItemCode", "").strip()
        item_name = record.get("ItemName", "").strip()
        price = record.get("Price", "").strip()
        categoria = record.get("Categoria", "").strip()
        subcategoria = record.get("SubCategoria", "").strip()

        if not item_code or not item_name:
            continue

        items.append(
            {
                "itemCode": item_code,
                "itemName": item_name,
                "price": price,
                "salUnitMsr": record.get("SalUnitMsr", "").strip() or None,
                "ncmCode": record.get("NcmCode", "").strip() or None,
                "categoria": categoria,
                "subCategoria": subcategoria,
            }
        )

    print(json.dumps(items, ensure_ascii=False))


if __name__ == "__main__":
    main()
