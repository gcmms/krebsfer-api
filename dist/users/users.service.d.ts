import { User } from '@prisma/client';
import { JwtPayload } from '../auth/interfaces/jwt-payload.interface';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateUserDto, requester: JwtPayload): Promise<Omit<User, 'senha' | 'refreshToken'>>;
    findAll(requester: JwtPayload): Promise<Omit<{
        revenda: {
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
        } | null;
    } & {
        id: string;
        email: string;
        nome: string;
        senha: string;
        telefone: string | null;
        dataNasc: Date | null;
        role: import(".prisma/client").$Enums.UserRole;
        revendaId: string | null;
        refreshToken: string | null;
        createdAt: Date;
        updatedAt: Date;
    }, "senha" | "refreshToken">[]>;
    findMe(userId: string): Promise<Omit<{
        revenda: {
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
        } | null;
    } & {
        id: string;
        email: string;
        nome: string;
        senha: string;
        telefone: string | null;
        dataNasc: Date | null;
        role: import(".prisma/client").$Enums.UserRole;
        revendaId: string | null;
        refreshToken: string | null;
        createdAt: Date;
        updatedAt: Date;
    }, "senha" | "refreshToken">>;
    update(id: string, dto: UpdateUserDto, requester: JwtPayload): Promise<Omit<User, 'senha' | 'refreshToken'>>;
    remove(id: string, requester: JwtPayload): Promise<{
        message: string;
    }>;
    changeMyPassword(requester: JwtPayload, dto: ChangePasswordDto): Promise<{
        message: string;
    }>;
    private sanitize;
    private ensureEmailAvailable;
    private ensureRevendaExists;
}
