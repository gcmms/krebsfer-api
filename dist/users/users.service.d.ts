import { User } from '@prisma/client';
import { JwtPayload } from '../auth/interfaces/jwt-payload.interface';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateUserDto, requester: JwtPayload): Promise<Omit<User, 'senha' | 'refreshToken'>>;
    findAll(requester: JwtPayload): Promise<Omit<{
        revenda: {
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
        } | null;
    } & {
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
    }, "senha" | "refreshToken">[]>;
    findMe(userId: string): Promise<Omit<{
        revenda: {
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
        } | null;
    } & {
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
    }, "senha" | "refreshToken">>;
    update(id: string, dto: UpdateUserDto, requester: JwtPayload): Promise<Omit<User, 'senha' | 'refreshToken'>>;
    remove(id: string, requester: JwtPayload): Promise<{
        message: string;
    }>;
    private sanitize;
    private ensureEmailAvailable;
    private ensureRevendaExists;
}
