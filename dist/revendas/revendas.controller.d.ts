import { JwtPayload } from '../auth/interfaces/jwt-payload.interface';
import { CreateRevendaDto } from './dto/create-revenda.dto';
import { UpdateRevendaDto } from './dto/update-revenda.dto';
import { RevendasService } from './revendas.service';
export declare class RevendasController {
    private readonly revendasService;
    constructor(revendasService: RevendasService);
    create(dto: CreateRevendaDto, user: JwtPayload): Promise<{
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
    update(id: string, dto: UpdateRevendaDto, user: JwtPayload): Promise<{
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
    remove(id: string, user: JwtPayload): Promise<{
        message: string;
    }>;
}
