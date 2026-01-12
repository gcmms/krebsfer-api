import { PrismaService } from '../prisma/prisma.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { JwtPayload } from '../auth/interfaces/jwt-payload.interface';
export declare class ClientesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateClienteDto, requester: JwtPayload): Promise<{
        revendas: {
            id: string;
            nome: string;
            createdAt: Date;
            updatedAt: Date;
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
        }[];
    } & {
        id: string;
        nome: string;
        createdAt: Date;
        updatedAt: Date;
        cnpjCpf: string;
        inscricaoEstadual: string | null;
        dataCadastro: Date;
        emailPrincipal: string;
        emailContato: string | null;
        telefoneFixo: string | null;
        telefoneContato: string | null;
        enderecoCompleto: string;
    }>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<({
        revendas: {
            id: string;
            nome: string;
            createdAt: Date;
            updatedAt: Date;
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
        }[];
    } & {
        id: string;
        nome: string;
        createdAt: Date;
        updatedAt: Date;
        cnpjCpf: string;
        inscricaoEstadual: string | null;
        dataCadastro: Date;
        emailPrincipal: string;
        emailContato: string | null;
        telefoneFixo: string | null;
        telefoneContato: string | null;
        enderecoCompleto: string;
    })[]>;
    findOne(id: string): Promise<{
        revendas: {
            id: string;
            nome: string;
            createdAt: Date;
            updatedAt: Date;
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
        }[];
    } & {
        id: string;
        nome: string;
        createdAt: Date;
        updatedAt: Date;
        cnpjCpf: string;
        inscricaoEstadual: string | null;
        dataCadastro: Date;
        emailPrincipal: string;
        emailContato: string | null;
        telefoneFixo: string | null;
        telefoneContato: string | null;
        enderecoCompleto: string;
    }>;
    update(id: string, dto: UpdateClienteDto, requester: JwtPayload): Promise<{
        revendas: {
            id: string;
            nome: string;
            createdAt: Date;
            updatedAt: Date;
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
        }[];
    } & {
        id: string;
        nome: string;
        createdAt: Date;
        updatedAt: Date;
        cnpjCpf: string;
        inscricaoEstadual: string | null;
        dataCadastro: Date;
        emailPrincipal: string;
        emailContato: string | null;
        telefoneFixo: string | null;
        telefoneContato: string | null;
        enderecoCompleto: string;
    }>;
    remove(id: string, requester: JwtPayload): Promise<{
        message: string;
    }>;
    private assertAdmin;
    private ensureExists;
}
