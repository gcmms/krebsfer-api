const fs = require("fs/promises");
const path = require("path");

const SRC = path.join(__dirname, "..", "prisma");
const DEST = path.join(__dirname, "..", "dist", "prisma");

async function copyPrisma() {
  await fs.rm(DEST, { recursive: true, force: true });
  await fs.cp(SRC, DEST, { recursive: true });
}

copyPrisma().catch((err) => {
  console.error("Failed to copy Prisma files:", err);
  process.exit(1);
});
