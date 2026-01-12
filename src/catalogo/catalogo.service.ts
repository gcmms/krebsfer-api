import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

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
}
