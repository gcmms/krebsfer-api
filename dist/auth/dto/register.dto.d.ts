import { UserRole } from '@prisma/client';
export declare class RegisterDto {
    nome: string;
    email: string;
    senha: string;
    telefone?: string;
    dataNasc?: Date;
    role?: UserRole;
    revendaId?: string;
}
