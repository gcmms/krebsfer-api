import { UserRole } from '@prisma/client';
export declare class CreateUserDto {
    nome: string;
    email: string;
    senha: string;
    telefone?: string;
    dataNasc?: Date;
    role?: UserRole;
    revendaId?: string;
}
