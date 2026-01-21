import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtPayloadWithRefresh } from './interfaces/jwt-payload.interface';
import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(dto: RegisterDto): Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            email: string;
            nome: string;
            telefone: string | null;
            dataNasc: Date | null;
            role: import(".prisma/client").$Enums.UserRole;
            revendaId: string | null;
            id: string;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    login(dto: LoginDto): Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            email: string;
            nome: string;
            telefone: string | null;
            dataNasc: Date | null;
            role: import(".prisma/client").$Enums.UserRole;
            revendaId: string | null;
            id: string;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    refresh(user: JwtPayloadWithRefresh): Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            email: string;
            nome: string;
            telefone: string | null;
            dataNasc: Date | null;
            role: import(".prisma/client").$Enums.UserRole;
            revendaId: string | null;
            id: string;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
}
