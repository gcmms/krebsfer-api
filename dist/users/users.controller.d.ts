import { JwtPayload } from '../auth/interfaces/jwt-payload.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(dto: CreateUserDto, user: JwtPayload): Promise<Omit<{
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
    me(user: JwtPayload): Promise<Omit<{
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
    changeMyPassword(dto: ChangePasswordDto, user: JwtPayload): Promise<{
        message: string;
    }>;
    findAll(user: JwtPayload): Promise<Omit<{
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
    update(id: string, dto: UpdateUserDto, user: JwtPayload): Promise<Omit<{
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
    remove(id: string, user: JwtPayload): Promise<{
        message: string;
    }>;
}
