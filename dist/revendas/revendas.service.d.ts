import { JwtPayload } from '../auth/interfaces/jwt-payload.interface';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRevendaDto } from './dto/create-revenda.dto';
import { UpdateRevendaDto } from './dto/update-revenda.dto';
export declare class RevendasService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateRevendaDto, requester: JwtPayload): Promise<{
        municipios: {
            id: string;
            nome: string;
            revendaId: string;
        }[];
    } & {
        id: string;
        nome: string;
        cnpjCpf: string;
        inscricaoEstadual: string | null;
        dataCadastro: Date;
        emailPrincipal: string;
        emailContato: string | null;
        telefoneFixo: string | null;
        telefoneContato: string | null;
        enderecoCompleto: string;
        createdAt: Date;
        updatedAt: Date;
        aliquotaDesconto: number;
        comissao: number;
    }>;
    findAll(): Promise<({
        municipios: {
            id: string;
            nome: string;
            revendaId: string;
        }[];
        usuarios: {
            id: string;
            nome: string;
            createdAt: Date;
            updatedAt: Date;
            email: string;
            senha: string;
            telefone: string | null;
            dataNasc: Date | null;
            role: import(".prisma/client").$Enums.UserRole;
            revendaId: string | null;
            refreshToken: string | null;
        }[];
    } & {
        id: string;
        nome: string;
        cnpjCpf: string;
        inscricaoEstadual: string | null;
        dataCadastro: Date;
        emailPrincipal: string;
        emailContato: string | null;
        telefoneFixo: string | null;
        telefoneContato: string | null;
        enderecoCompleto: string;
        createdAt: Date;
        updatedAt: Date;
        aliquotaDesconto: number;
        comissao: number;
    })[]>;
    findOne(id: string): Promise<{
        municipios: {
            id: string;
            nome: string;
            revendaId: string;
        }[];
        usuarios: {
            id: string;
            nome: string;
            createdAt: Date;
            updatedAt: Date;
            email: string;
            senha: string;
            telefone: string | null;
            dataNasc: Date | null;
            role: import(".prisma/client").$Enums.UserRole;
            revendaId: string | null;
            refreshToken: string | null;
        }[];
    } & {
        id: string;
        nome: string;
        cnpjCpf: string;
        inscricaoEstadual: string | null;
        dataCadastro: Date;
        emailPrincipal: string;
        emailContato: string | null;
        telefoneFixo: string | null;
        telefoneContato: string | null;
        enderecoCompleto: string;
        createdAt: Date;
        updatedAt: Date;
        aliquotaDesconto: number;
        comissao: number;
    }>;
    update(id: string, dto: UpdateRevendaDto, requester: JwtPayload): Promise<{
        municipios: {
            id: string;
            nome: string;
            revendaId: string;
        }[];
        usuarios: {
            id: string;
            nome: string;
            createdAt: Date;
            updatedAt: Date;
            email: string;
            senha: string;
            telefone: string | null;
            dataNasc: Date | null;
            role: import(".prisma/client").$Enums.UserRole;
            revendaId: string | null;
            refreshToken: string | null;
        }[];
    } & {
        id: string;
        nome: string;
        cnpjCpf: string;
        inscricaoEstadual: string | null;
        dataCadastro: Date;
        emailPrincipal: string;
        emailContato: string | null;
        telefoneFixo: string | null;
        telefoneContato: string | null;
        enderecoCompleto: string;
        createdAt: Date;
        updatedAt: Date;
        aliquotaDesconto: number;
        comissao: number;
    }>;
    remove(id: string, requester: JwtPayload): Promise<{
        message: string;
    }>;
    private assertAdmin;
    private ensureExists;
}
