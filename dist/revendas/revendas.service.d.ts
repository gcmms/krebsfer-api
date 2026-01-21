import { JwtPayload } from '../auth/interfaces/jwt-payload.interface';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRevendaDto } from './dto/create-revenda.dto';
import { UpdateRevendaDto } from './dto/update-revenda.dto';
export declare class RevendasService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateRevendaDto, requester: JwtPayload): Promise<{
        municipios: {
            nome: string;
            revendaId: string;
            id: string;
        }[];
    } & {
        nome: string;
        id: string;
        cnpjCpf: string;
        inscricaoEstadual: string | null;
        dataCadastro: Date;
        emailPrincipal: string;
        emailContato: string | null;
        telefoneFixo: string | null;
        telefoneContato: string | null;
        enderecoCompleto: string;
        aliquotaDesconto: number;
        comissao: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(): Promise<({
        municipios: {
            nome: string;
            revendaId: string;
            id: string;
        }[];
        usuarios: {
            email: string;
            senha: string;
            nome: string;
            telefone: string | null;
            dataNasc: Date | null;
            role: import(".prisma/client").$Enums.UserRole;
            revendaId: string | null;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            refreshToken: string | null;
        }[];
    } & {
        nome: string;
        id: string;
        cnpjCpf: string;
        inscricaoEstadual: string | null;
        dataCadastro: Date;
        emailPrincipal: string;
        emailContato: string | null;
        telefoneFixo: string | null;
        telefoneContato: string | null;
        enderecoCompleto: string;
        aliquotaDesconto: number;
        comissao: number;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    findOne(id: string): Promise<{
        municipios: {
            nome: string;
            revendaId: string;
            id: string;
        }[];
        usuarios: {
            email: string;
            senha: string;
            nome: string;
            telefone: string | null;
            dataNasc: Date | null;
            role: import(".prisma/client").$Enums.UserRole;
            revendaId: string | null;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            refreshToken: string | null;
        }[];
    } & {
        nome: string;
        id: string;
        cnpjCpf: string;
        inscricaoEstadual: string | null;
        dataCadastro: Date;
        emailPrincipal: string;
        emailContato: string | null;
        telefoneFixo: string | null;
        telefoneContato: string | null;
        enderecoCompleto: string;
        aliquotaDesconto: number;
        comissao: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: string, dto: UpdateRevendaDto, requester: JwtPayload): Promise<{
        municipios: {
            nome: string;
            revendaId: string;
            id: string;
        }[];
        usuarios: {
            email: string;
            senha: string;
            nome: string;
            telefone: string | null;
            dataNasc: Date | null;
            role: import(".prisma/client").$Enums.UserRole;
            revendaId: string | null;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            refreshToken: string | null;
        }[];
    } & {
        nome: string;
        id: string;
        cnpjCpf: string;
        inscricaoEstadual: string | null;
        dataCadastro: Date;
        emailPrincipal: string;
        emailContato: string | null;
        telefoneFixo: string | null;
        telefoneContato: string | null;
        enderecoCompleto: string;
        aliquotaDesconto: number;
        comissao: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: string, requester: JwtPayload): Promise<{
        message: string;
    }>;
    private assertAdmin;
    private ensureExists;
}
