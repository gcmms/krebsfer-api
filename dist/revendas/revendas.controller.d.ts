import { JwtPayload } from '../auth/interfaces/jwt-payload.interface';
import { CreateRevendaDto } from './dto/create-revenda.dto';
import { UpdateRevendaDto } from './dto/update-revenda.dto';
import { RevendasService } from './revendas.service';
export declare class RevendasController {
    private readonly revendasService;
    constructor(revendasService: RevendasService);
    create(dto: CreateRevendaDto, user: JwtPayload): Promise<{
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
    update(id: string, dto: UpdateRevendaDto, user: JwtPayload): Promise<{
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
    remove(id: string, user: JwtPayload): Promise<{
        message: string;
    }>;
}
