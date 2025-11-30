import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Revenda, UserRole } from '@prisma/client';
import { JwtPayload } from '../auth/interfaces/jwt-payload.interface';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRevendaDto } from './dto/create-revenda.dto';
import { UpdateRevendaDto } from './dto/update-revenda.dto';

@Injectable()
export class RevendasService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateRevendaDto, requester: JwtPayload) {
    this.assertAdmin(requester);

    const revenda = await this.prisma.revenda.create({
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
        aliquotaDesconto: dto.aliquotaDesconto ?? 0,
        comissao: dto.comissao ?? 0,
        municipios: {
          create: dto.municipiosAtuacao.map((nome) => ({ nome })),
        },
      },
      include: { municipios: true },
    });

    return revenda;
  }

  async findAll() {
    return this.prisma.revenda.findMany({
      include: { municipios: true, usuarios: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const revenda = await this.prisma.revenda.findUnique({
      where: { id },
      include: { municipios: true, usuarios: true },
    });
    if (!revenda) {
      throw new NotFoundException('Revenda não encontrada');
    }
    return revenda;
  }

  async update(id: string, dto: UpdateRevendaDto, requester: JwtPayload) {
    await this.ensureExists(id);

    if (
      requester.role !== UserRole.ADMIN &&
      !(requester.role === UserRole.GERENTE_REVENDA && requester.revendaId === id)
    ) {
      throw new ForbiddenException(
        'Somente ADMIN ou GERENTE_REVENDA da própria revenda podem editar',
      );
    }

    const updated = await this.prisma.revenda.update({
      where: { id },
      data: {
        nome: dto.nome,
        cnpjCpf: dto.cnpjCpf,
        inscricaoEstadual: dto.inscricaoEstadual,
        emailPrincipal: dto.emailPrincipal,
        emailContato: dto.emailContato,
        telefoneFixo: dto.telefoneFixo,
        telefoneContato: dto.telefoneContato,
        enderecoCompleto: dto.enderecoCompleto,
        aliquotaDesconto: dto.aliquotaDesconto,
        comissao: dto.comissao,
        municipios: dto.municipiosAtuacao
          ? {
              deleteMany: {},
              create: dto.municipiosAtuacao.map((nome) => ({ nome })),
            }
          : undefined,
      },
      include: { municipios: true, usuarios: true },
    });

    return updated;
  }

  async remove(id: string, requester: JwtPayload) {
    this.assertAdmin(requester);
    await this.ensureExists(id);

    await this.prisma.municipioAtuacao.deleteMany({ where: { revendaId: id } });
    await this.prisma.user.updateMany({
      where: { revendaId: id },
      data: { revendaId: null },
    });
    await this.prisma.revenda.delete({ where: { id } });

    return { message: 'Revenda removida com sucesso' };
  }

  private assertAdmin(requester: JwtPayload) {
    if (requester.role !== UserRole.ADMIN) {
      throw new ForbiddenException('Somente ADMIN pode executar esta ação');
    }
  }

  private async ensureExists(id: string): Promise<Revenda> {
    const revenda = await this.prisma.revenda.findUnique({ where: { id } });
    if (!revenda) {
      throw new NotFoundException('Revenda não encontrada');
    }
    return revenda;
  }
}
