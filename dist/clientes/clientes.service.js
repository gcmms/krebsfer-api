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
exports.ClientesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
let ClientesService = class ClientesService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto, requester) {
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
    findAll() {
        return this.prisma.cliente.findMany({
            orderBy: { createdAt: 'desc' },
            include: { revendas: true },
        });
    }
    async findOne(id) {
        const cliente = await this.prisma.cliente.findUnique({
            where: { id },
            include: { revendas: true },
        });
        if (!cliente) {
            throw new common_1.NotFoundException('Cliente não encontrado');
        }
        return cliente;
    }
    async update(id, dto, requester) {
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
    async remove(id, requester) {
        this.assertAdmin(requester);
        await this.ensureExists(id);
        await this.prisma.cliente.delete({ where: { id } });
        return { message: 'Cliente removido com sucesso' };
    }
    assertAdmin(requester) {
        if (requester.role !== client_1.UserRole.ADMIN) {
            throw new common_1.ForbiddenException('Somente ADMIN pode executar esta ação');
        }
    }
    async ensureExists(id) {
        const cliente = await this.prisma.cliente.findUnique({ where: { id } });
        if (!cliente) {
            throw new common_1.NotFoundException('Cliente não encontrado');
        }
        return cliente;
    }
};
exports.ClientesService = ClientesService;
exports.ClientesService = ClientesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ClientesService);
//# sourceMappingURL=clientes.service.js.map