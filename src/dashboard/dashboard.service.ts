import { Injectable } from '@nestjs/common';
import { OrcamentoStatus } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private readonly prisma: PrismaService) {}

  async getDashboard() {
    const [
      totalRevendas,
      totalPedidosSap,
      aguardandoSap,
      valorPedidosSap,
      ultimosOrcamentos,
    ] = await Promise.all([
      this.prisma.revenda.count(),
      this.prisma.orcamento.count({
        where: { status: OrcamentoStatus.PEDIDO_CRIADO_SAP },
      }),
      this.prisma.orcamento.count({
        where: { status: OrcamentoStatus.APROVADO },
      }),
      this.prisma.orcamento.aggregate({
        _sum: { total: true },
        where: { status: OrcamentoStatus.PEDIDO_CRIADO_SAP },
      }),
      this.prisma.orcamento.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: { cliente: true },
      }),
    ]);

    return {
      indicadores: {
        valor_total_pedidos_sap: Number(valorPedidosSap._sum.total ?? 0),
        total_pedidos_sap: totalPedidosSap,
        aguardando_sap: aguardandoSap,
        total_revendas: totalRevendas,
      },
      ultimos_orcamentos: ultimosOrcamentos.map((orcamento) => ({
        id: orcamento.id,
        numero_orcamento: orcamento.numeroOrcamento,
        cliente: orcamento.cliente?.nome ?? '',
        status: orcamento.status.toLowerCase(),
        total: Number(orcamento.total),
        data_criacao: orcamento.createdAt,
      })),
    };
  }
}
