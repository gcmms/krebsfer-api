"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const bcrypt = __importStar(require("bcrypt"));
const prisma_service_1 = require("../prisma/prisma.service");
let UsersService = class UsersService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto, requester) {
        var _a, _b;
        const role = (_a = dto.role) !== null && _a !== void 0 ? _a : client_1.UserRole.USUARIO_REVENDA;
        if (role !== client_1.UserRole.ADMIN && !dto.revendaId) {
            throw new common_1.BadRequestException('revendaId é obrigatório para este perfil');
        }
        if (requester.role !== client_1.UserRole.ADMIN) {
            if (!requester.revendaId) {
                throw new common_1.ForbiddenException('Usuário sem revenda vinculada');
            }
            if (dto.revendaId && dto.revendaId !== requester.revendaId) {
                throw new common_1.ForbiddenException('Você só pode criar usuários da sua revenda');
            }
            if (role === client_1.UserRole.ADMIN) {
                throw new common_1.ForbiddenException('Somente ADMIN pode criar outro ADMIN');
            }
        }
        await this.ensureRevendaExists(dto.revendaId);
        await this.ensureEmailAvailable(dto.email);
        const hashedPassword = await bcrypt.hash(dto.senha, 10);
        const user = await this.prisma.user.create({
            data: {
                nome: dto.nome,
                email: dto.email,
                senha: hashedPassword,
                telefone: dto.telefone,
                dataNasc: dto.dataNasc ? new Date(dto.dataNasc) : undefined,
                role,
                revendaId: (_b = dto.revendaId) !== null && _b !== void 0 ? _b : null,
            },
        });
        return this.sanitize(user);
    }
    async findAll(requester) {
        if (requester.role === client_1.UserRole.ADMIN) {
            const users = await this.prisma.user.findMany({
                include: { revenda: true },
                orderBy: { createdAt: 'desc' },
            });
            return users.map((user) => this.sanitize(user));
        }
        if (requester.role === client_1.UserRole.GERENTE_REVENDA) {
            if (!requester.revendaId) {
                throw new common_1.ForbiddenException('Usuário sem revenda vinculada');
            }
            const users = await this.prisma.user.findMany({
                where: { revendaId: requester.revendaId },
                include: { revenda: true },
                orderBy: { createdAt: 'desc' },
            });
            return users.map((user) => this.sanitize(user));
        }
        throw new common_1.ForbiddenException('Acesso negado');
    }
    async findMe(userId) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            include: { revenda: true },
        });
        if (!user) {
            throw new common_1.NotFoundException('Usuário não encontrado');
        }
        return this.sanitize(user);
    }
    async update(id, dto, requester) {
        var _a, _b, _c, _d, _e;
        const user = await this.prisma.user.findUnique({ where: { id } });
        if (!user) {
            throw new common_1.NotFoundException('Usuário não encontrado');
        }
        if (requester.role !== client_1.UserRole.ADMIN) {
            if (!requester.revendaId ||
                user.revendaId !== requester.revendaId ||
                (dto.revendaId && dto.revendaId !== requester.revendaId)) {
                throw new common_1.ForbiddenException('Você só pode atualizar usuários da sua revenda');
            }
            if (user.role === client_1.UserRole.ADMIN || dto.role === client_1.UserRole.ADMIN) {
                throw new common_1.ForbiddenException('Somente ADMIN pode alterar perfil ADMIN');
            }
        }
        if (dto.role === client_1.UserRole.ADMIN && requester.role !== client_1.UserRole.ADMIN) {
            throw new common_1.ForbiddenException('Somente ADMIN pode definir perfil ADMIN');
        }
        if (dto.revendaId) {
            await this.ensureRevendaExists(dto.revendaId);
        }
        if (dto.email && dto.email !== user.email) {
            await this.ensureEmailAvailable(dto.email);
        }
        let hashedPassword;
        if (dto.senha) {
            hashedPassword = await bcrypt.hash(dto.senha, 10);
        }
        const updated = await this.prisma.user.update({
            where: { id },
            data: {
                nome: (_a = dto.nome) !== null && _a !== void 0 ? _a : user.nome,
                email: (_b = dto.email) !== null && _b !== void 0 ? _b : user.email,
                telefone: (_c = dto.telefone) !== null && _c !== void 0 ? _c : user.telefone,
                dataNasc: dto.dataNasc ? new Date(dto.dataNasc) : user.dataNasc,
                role: (_d = dto.role) !== null && _d !== void 0 ? _d : user.role,
                revendaId: requester.role === client_1.UserRole.ADMIN
                    ? (_e = dto.revendaId) !== null && _e !== void 0 ? _e : user.revendaId
                    : requester.revendaId,
                senha: hashedPassword !== null && hashedPassword !== void 0 ? hashedPassword : user.senha,
            },
        });
        return this.sanitize(updated);
    }
    async remove(id, requester) {
        if (requester.role !== client_1.UserRole.ADMIN) {
            throw new common_1.ForbiddenException('Somente ADMIN pode remover usuários');
        }
        const exists = await this.prisma.user.findUnique({ where: { id } });
        if (!exists) {
            throw new common_1.NotFoundException('Usuário não encontrado');
        }
        await this.prisma.user.delete({ where: { id } });
        return { message: 'Usuário removido com sucesso' };
    }
    sanitize(user) {
        const { senha, refreshToken } = user, rest = __rest(user, ["senha", "refreshToken"]);
        return rest;
    }
    async ensureEmailAvailable(email) {
        const existing = await this.prisma.user.findUnique({ where: { email } });
        if (existing) {
            throw new common_1.BadRequestException('E-mail já cadastrado');
        }
    }
    async ensureRevendaExists(revendaId) {
        if (!revendaId) {
            return;
        }
        const revenda = await this.prisma.revenda.findUnique({
            where: { id: revendaId },
        });
        if (!revenda) {
            throw new common_1.BadRequestException('Revenda informada não encontrada');
        }
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsersService);
//# sourceMappingURL=users.service.js.map