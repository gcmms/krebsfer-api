"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RevendasService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const prisma_service_1 = require("../prisma/prisma.service");
let RevendasService = class RevendasService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto, requester) {
        var _a, _b;
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
                aliquotaDesconto: (_a = dto.aliquotaDesconto) !== null && _a !== void 0 ? _a : 0,
                comissao: (_b = dto.comissao) !== null && _b !== void 0 ? _b : 0,
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
    async findOne(id) {
        const revenda = await this.prisma.revenda.findUnique({
            where: { id },
            include: { municipios: true, usuarios: true },
        });
        if (!revenda) {
            throw new common_1.NotFoundException('Revenda não encontrada');
        }
        return revenda;
    }
    async update(id, dto, requester) {
        await this.ensureExists(id);
        if (requester.role !== client_1.UserRole.ADMIN &&
            !(requester.role === client_1.UserRole.GERENTE_REVENDA && requester.revendaId === id)) {
            throw new common_1.ForbiddenException('Somente ADMIN ou GERENTE_REVENDA da própria revenda podem editar');
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
    async remove(id, requester) {
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
    assertAdmin(requester) {
        if (requester.role !== client_1.UserRole.ADMIN) {
            throw new common_1.ForbiddenException('Somente ADMIN pode executar esta ação');
        }
    }
    async ensureExists(id) {
        const revenda = await this.prisma.revenda.findUnique({ where: { id } });
        if (!revenda) {
            throw new common_1.NotFoundException('Revenda não encontrada');
        }
        return revenda;
    }
};
exports.RevendasService = RevendasService;
exports.RevendasService = RevendasService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], RevendasService);
//# sourceMappingURL=revendas.service.js.map