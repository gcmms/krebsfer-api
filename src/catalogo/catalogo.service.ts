import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { ImportCatalogoItemDto } from './dto/import-catalogo-item.dto';

type CatalogoQuery = {
  search?: string;
  skip?: number;
  take?: number;
};

@Injectable()
export class CatalogoService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll({ search, skip = 0, take = 5000 }: CatalogoQuery) {
    const where: Prisma.CatalogoPecaWhereInput | undefined = search
      ? {
          OR: [
            { itemCode: { contains: search, mode: Prisma.QueryMode.insensitive } },
            { itemName: { contains: search, mode: Prisma.QueryMode.insensitive } },
            { categoriaNome: { contains: search, mode: Prisma.QueryMode.insensitive } },
            { subcategoriaNome: { contains: search, mode: Prisma.QueryMode.insensitive } },
          ],
        }
      : undefined;

    const pecas = await this.prisma.catalogoPeca.findMany({
      where,
      skip,
      take,
      orderBy: { itemCode: 'asc' },
    });

    return pecas.map((peca) => ({
      itemCode: peca.itemCode,
      itemName: peca.itemName,
      price: Number(peca.price),
      salUnitMsr: peca.salUnitMsr,
      ncmCode: peca.ncmCode,
      categoria: peca.categoriaNome,
      subcategoria: peca.subcategoriaNome,
    }));
  }

  async importCatalogo(itens: ImportCatalogoItemDto[]) {
    const normalized = itens.map((item) => ({
      ...item,
      itemCode: item.itemCode.trim(),
      itemName: item.itemName.trim(),
      categoria: item.categoria.trim(),
      subcategoria: item.subcategoria.trim(),
      salUnitMsr: item.salUnitMsr?.trim(),
      ncmCode: item.ncmCode?.trim(),
    }));

    const categorias = Array.from(
      new Set(normalized.map((item) => item.categoria)),
    ).map((nome) => ({ nome }));

    const subcategorias = Array.from(
      new Set(
        normalized.map(
          (item) => `${item.categoria}||${item.subcategoria}`,
        ),
      ),
    ).map((key) => {
      const [categoriaNome, nome] = key.split('||');
      return { categoriaNome, nome };
    });

    if (categorias.length) {
      await this.prisma.catalogoCategoria.createMany({
        data: categorias,
        skipDuplicates: true,
      });
    }

    if (subcategorias.length) {
      await this.prisma.catalogoSubcategoria.createMany({
        data: subcategorias,
        skipDuplicates: true,
      });
    }

    for (const item of normalized) {
      await this.prisma.catalogoPeca.upsert({
        where: { itemCode: item.itemCode },
        create: {
          itemCode: item.itemCode,
          itemName: item.itemName,
          price: item.price,
          salUnitMsr: item.salUnitMsr,
          ncmCode: item.ncmCode,
          categoriaNome: item.categoria,
          subcategoriaNome: item.subcategoria,
        },
        update: {
          itemName: item.itemName,
          price: item.price,
          salUnitMsr: item.salUnitMsr,
          ncmCode: item.ncmCode,
          categoriaNome: item.categoria,
          subcategoriaNome: item.subcategoria,
        },
      });
    }

    return {
      imported: normalized.length,
    };
  }
}
