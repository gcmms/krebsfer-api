const fs = require("fs");
const { PrismaClient } = require("@prisma/client");

function readJsonFromStdin() {
  return new Promise((resolve, reject) => {
    let data = "";
    process.stdin.setEncoding("utf8");
    process.stdin.on("data", (chunk) => {
      data += chunk;
    });
    process.stdin.on("end", () => {
      try {
        resolve(JSON.parse(data));
      } catch (err) {
        reject(err);
      }
    });
    process.stdin.on("error", reject);
  });
}

function normalizeString(value) {
  if (value === null || value === undefined) return "";
  return String(value).trim();
}

async function main() {
  const items = await readJsonFromStdin();
  if (!Array.isArray(items)) {
    throw new Error("Expected JSON array on stdin.");
  }

  const categoriesSet = new Set();
  const subcategoriesSet = new Set();
  const pecas = [];

  for (const item of items) {
    const itemCode = normalizeString(item.itemCode);
    const itemName = normalizeString(item.itemName);
    const price = normalizeString(item.price);
    const categoria = normalizeString(item.categoria);
    const subCategoria = normalizeString(item.subCategoria);

    if (!itemCode || !itemName || !price || !categoria || !subCategoria) {
      continue;
    }

    categoriesSet.add(categoria);
    subcategoriesSet.add(`${categoria}||${subCategoria}`);

    pecas.push({
      itemCode,
      itemName,
      price,
      salUnitMsr: item.salUnitMsr || null,
      ncmCode: item.ncmCode || null,
      categoriaNome: categoria,
      subcategoriaNome: subCategoria,
    });
  }

  const categories = Array.from(categoriesSet).map((nome) => ({ nome }));
  const subcategories = Array.from(subcategoriesSet).map((key) => {
    const [categoriaNome, nome] = key.split("||");
    return { categoriaNome, nome };
  });

  const prisma = new PrismaClient();
  try {
    if (categories.length) {
      await prisma.catalogoCategoria.createMany({
        data: categories,
        skipDuplicates: true,
      });
    }

    if (subcategories.length) {
      await prisma.catalogoSubcategoria.createMany({
        data: subcategories,
        skipDuplicates: true,
      });
    }

    if (pecas.length) {
      await prisma.catalogoPeca.createMany({
        data: pecas,
        skipDuplicates: true,
      });
    }
  } finally {
    await prisma.$disconnect();
  }

  console.log(
    `Import concluído. Categorias: ${categories.length}, Subcategorias: ${subcategories.length}, Peças: ${pecas.length}`
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
