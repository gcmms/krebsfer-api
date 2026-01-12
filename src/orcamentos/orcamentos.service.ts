import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma, OrcamentoStatus } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrcamentoDto, OrcamentoStatusDto } from './dto/create-orcamento.dto';
import { JwtPayload } from '../auth/interfaces/jwt-payload.interface';

const STATUS_MAP: Record<OrcamentoStatusDto, OrcamentoStatus> = {
  [OrcamentoStatusDto.RASCUNHO]: OrcamentoStatus.RASCUNHO,
  [OrcamentoStatusDto.APROVADO]: OrcamentoStatus.APROVADO,
  [OrcamentoStatusDto.PEDIDO_CRIADO_SAP]: OrcamentoStatus.PEDIDO_CRIADO_SAP,
  [OrcamentoStatusDto.FINALIZADO]: OrcamentoStatus.FINALIZADO,
};

@Injectable()
export class OrcamentosService {
  constructor(private readonly prisma: PrismaService) {}

  private mapStatus(status?: OrcamentoStatusDto) {
    if (!status) return OrcamentoStatus.RASCUNHO;
    return STATUS_MAP[status] ?? OrcamentoStatus.RASCUNHO;
  }

  private async nextNumeroOrcamento() {
    const count = await this.prisma.orcamento.count();
    const year = new Date().getFullYear();
    const seq = String(count + 1).padStart(5, '0');
    return `ORC-${year}-${seq}`;
  }

  async create(dto: CreateOrcamentoDto, user: JwtPayload) {
    if (!dto.itens || dto.itens.length === 0) {
      throw new BadRequestException('Informe ao menos um item');
    }

    const numeroOrcamento = await this.nextNumeroOrcamento();
    const total = dto.itens.reduce(
      (acc, item) => acc + item.precoFinal * item.quantidade,
      0,
    );

    const orcamento = await this.prisma.orcamento.create({
      data: {
        numeroOrcamento,
        versao: 1,
        status: this.mapStatus(dto.status),
        comissionado: dto.comissionado ?? false,
        referenciaPedido: dto.referenciaPedido,
        observacoes: dto.observacoes,
        total: new Prisma.Decimal(total),
        clienteId: dto.clienteId,
        revendaId: dto.revendaId,
        createdById: user?.sub ?? null,
        itens: {
          create: dto.itens.map((item) => ({
            itemCode: item.itemCode,
            itemName: item.itemName,
            quantidade: item.quantidade,
            precoCheio: new Prisma.Decimal(item.precoCheio),
            precoDesconto: new Prisma.Decimal(item.precoDesconto),
            imposto01: new Prisma.Decimal(item.imposto01),
            imposto02: new Prisma.Decimal(item.imposto02),
            imposto03: new Prisma.Decimal(item.imposto03),
            precoFinal: new Prisma.Decimal(item.precoFinal),
          })),
        },
      },
      include: {
        cliente: true,
        revenda: true,
        itens: true,
      },
    });

    return this.mapOrcamento(orcamento, true);
  }

  async findAll() {
    const orcamentos = await this.prisma.orcamento.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        cliente: true,
        revenda: true,
      },
    });

    return orcamentos.map((orcamento) => this.mapOrcamento(orcamento));
  }

  async findOne(id: string) {
    const orcamento = await this.prisma.orcamento.findUnique({
      where: { id },
      include: {
        cliente: true,
        revenda: true,
        itens: true,
      },
    });

    if (!orcamento) {
      throw new BadRequestException('Orçamento não encontrado');
    }

    return this.mapOrcamento(orcamento, true);
  }

  async updateStatus(id: string, status: OrcamentoStatusDto) {
    const orcamento = await this.prisma.orcamento.findUnique({
      where: { id },
    });

    if (!orcamento) {
      throw new BadRequestException('Orçamento não encontrado');
    }

    const updated = await this.prisma.orcamento.update({
      where: { id },
      data: { status: this.mapStatus(status) },
      include: { cliente: true, revenda: true, itens: true },
    });

    return this.mapOrcamento(updated, true);
  }

  private mapOrcamento(orcamento: any, includeItens = false) {
    return {
      id: orcamento.id,
      numero_orcamento: orcamento.numeroOrcamento,
      versao: orcamento.versao,
      status: orcamento.status.toLowerCase(),
      comissionado: orcamento.comissionado,
      referencia_pedido: orcamento.referenciaPedido,
      observacoes: orcamento.observacoes,
      numero_pedido_sap: orcamento.numeroPedidoSap,
      total: Number(orcamento.total),
      data_criacao: orcamento.createdAt,
      cliente: orcamento.cliente?.nome ?? '',
      revenda: orcamento.revenda?.nome ?? '',
      cliente_id: orcamento.clienteId,
      revenda_id: orcamento.revendaId,
      cliente_dados: orcamento.cliente
        ? {
            nome: orcamento.cliente.nome,
            cnpj_cpf: orcamento.cliente.cnpjCpf,
            inscricao_estadual: orcamento.cliente.inscricaoEstadual,
            email: orcamento.cliente.emailPrincipal,
            telefone: orcamento.cliente.telefoneContato ?? orcamento.cliente.telefoneFixo,
            endereco: orcamento.cliente.enderecoCompleto,
          }
        : null,
      revenda_dados: orcamento.revenda
        ? {
            nome: orcamento.revenda.nome,
            cnpj_cpf: orcamento.revenda.cnpjCpf,
            inscricao_estadual: orcamento.revenda.inscricaoEstadual,
            email: orcamento.revenda.emailPrincipal,
            telefone: orcamento.revenda.telefoneContato ?? orcamento.revenda.telefoneFixo,
            endereco: orcamento.revenda.enderecoCompleto,
          }
        : null,
      itens: includeItens
        ? orcamento.itens.map((item: any) => ({
            codigo_sap: item.itemCode,
            descricao: item.itemName,
            quantidade: item.quantidade,
            preco_cheio: Number(item.precoCheio),
            preco_desconto: Number(item.precoDesconto),
            imposto_01: Number(item.imposto01),
            imposto_02: Number(item.imposto02),
            imposto_03: Number(item.imposto03),
            preco_final: Number(item.precoFinal),
          }))
        : undefined,
    };
  }
}
