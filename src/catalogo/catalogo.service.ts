import { Injectable } from '@nestjs/common';
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
    const where = search
      ? {
          OR: [
            { itemCode: { contains: search, mode: 'insensitive' } },
            { itemName: { contains: search, mode: 'insensitive' } },
            { categoriaNome: { contains: search, mode: 'insensitive' } },
            { subcategoriaNome: { contains: search, mode: 'insensitive' } },
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
