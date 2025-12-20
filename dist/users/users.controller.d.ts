import { JwtPayload } from '../auth/interfaces/jwt-payload.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(dto: CreateUserDto, user: JwtPayload): Promise<Omit<{
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
    me(user: JwtPayload): Promise<Omit<{
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
    findAll(user: JwtPayload): Promise<Omit<{
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
    update(id: string, dto: UpdateUserDto, user: JwtPayload): Promise<Omit<{
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
    remove(id: string, user: JwtPayload): Promise<{
        message: string;
    }>;
}
