import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { JwtPayload } from '../auth/interfaces/jwt-payload.interface';
import { UserRole } from '@prisma/client';

@Injectable()
export class ClientesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateClienteDto, requester: JwtPayload) {
    this.assertAdmin(requester);

    return this.prisma.cliente.create({
      data: {
        nome: dto.nome,
        cnpjCpf: dto.cnpjCpf,
        inscricaoEstadual: dto.inscricaoEstadual,
        dataCadastro: dto.dataCadastro ? new Date(dto.dataCadastro) : undefined,
        emailPrincipal: dto.emailPrincipal,
        emailContato: dto.emailContato,
        telefoneFixo: dto.telefoneFixo,
        telefoneContato: dto.telefoneContato,
        enderecoCompleto: dto.enderecoCompleto,
        uf: dto.uf,
        revendas: {
          connect: dto.revendaIds.map((revendaId) => ({ id: revendaId })),
        },
      },
      include: { revendas: true },
    });
  }

  findAll(requester: JwtPayload) {
    if (requester.role !== UserRole.ADMIN) {
      if (!requester.revendaId) {
        throw new ForbiddenException('Você não tem revenda associada');
      }
      return this.prisma.cliente.findMany({
        where: { revendas: { some: { id: requester.revendaId } } },
        orderBy: { createdAt: 'desc' },
        include: { revendas: true },
      });
    }

    return this.prisma.cliente.findMany({
      orderBy: { createdAt: 'desc' },
      include: { revendas: true },
    });
  }

  async findOne(id: string, requester: JwtPayload) {
    if (requester.role !== UserRole.ADMIN) {
      if (!requester.revendaId) {
        throw new ForbiddenException('Você não tem acesso a este cliente');
      }
      const cliente = await this.prisma.cliente.findFirst({
        where: { id, revendas: { some: { id: requester.revendaId } } },
        include: { revendas: true },
      });
      if (!cliente) {
        throw new NotFoundException('Cliente não encontrado');
      }
      return cliente;
    }

    const cliente = await this.prisma.cliente.findUnique({
      where: { id },
      include: { revendas: true },
    });
    if (!cliente) {
      throw new NotFoundException('Cliente não encontrado');
    }
    return cliente;
  }

  async update(id: string, dto: UpdateClienteDto, requester: JwtPayload) {
    this.assertAdmin(requester);
    await this.ensureExists(id);

    return this.prisma.cliente.update({
      where: { id },
      data: {
        nome: dto.nome,
        cnpjCpf: dto.cnpjCpf,
        inscricaoEstadual: dto.inscricaoEstadual,
        dataCadastro: dto.dataCadastro ? new Date(dto.dataCadastro) : undefined,
        emailPrincipal: dto.emailPrincipal,
        emailContato: dto.emailContato,
        telefoneFixo: dto.telefoneFixo,
        telefoneContato: dto.telefoneContato,
        enderecoCompleto: dto.enderecoCompleto,
        uf: dto.uf,
        revendas: dto.revendaIds
          ? {
              set: dto.revendaIds.map((revendaId) => ({ id: revendaId })),
            }
          : undefined,
      },
      include: { revendas: true },
    });
  }

  async remove(id: string, requester: JwtPayload) {
    this.assertAdmin(requester);
    await this.ensureExists(id);
    await this.prisma.cliente.delete({ where: { id } });
    return { message: 'Cliente removido com sucesso' };
  }

  private assertAdmin(requester: JwtPayload) {
    if (requester.role !== UserRole.ADMIN) {
      throw new ForbiddenException('Somente ADMIN pode executar esta ação');
    }
  }

  private async ensureExists(id: string) {
    const cliente = await this.prisma.cliente.findUnique({ where: { id } });
    if (!cliente) {
      throw new NotFoundException('Cliente não encontrado');
    }
    return cliente;
  }
}
