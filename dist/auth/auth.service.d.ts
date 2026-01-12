import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
export declare class AuthService {
    private readonly prisma;
    private readonly jwtService;
    private readonly configService;
    private readonly saltRounds;
    constructor(prisma: PrismaService, jwtService: JwtService, configService: ConfigService);
    register(dto: RegisterDto): Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            id: string;
            email: string;
            nome: string;
            telefone: string | null;
            dataNasc: Date | null;
            role: import(".prisma/client").$Enums.UserRole;
            revendaId: string | null;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    login(dto: LoginDto): Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            id: string;
            email: string;
            nome: string;
            telefone: string | null;
            dataNasc: Date | null;
            role: import(".prisma/client").$Enums.UserRole;
            revendaId: string | null;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    refreshTokens(userId: string, refreshToken: string): Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            id: string;
            email: string;
            nome: string;
            telefone: string | null;
            dataNasc: Date | null;
            role: import(".prisma/client").$Enums.UserRole;
            revendaId: string | null;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    private updateRefreshToken;
    private getTokens;
    private sanitizeUser;
    private hashData;
}
