import { ClientesService } from './clientes.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { JwtPayload } from '../auth/interfaces/jwt-payload.interface';
export declare class ClientesController {
    private readonly clientesService;
    constructor(clientesService: ClientesService);
    create(dto: CreateClienteDto, user: JwtPayload): Promise<{
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
    update(id: string, dto: UpdateClienteDto, user: JwtPayload): Promise<{
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
    remove(id: string, user: JwtPayload): Promise<{
        message: string;
    }>;
}
