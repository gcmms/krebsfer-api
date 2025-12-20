import { UserRole } from '@prisma/client';
export interface JwtPayload {
    sub: string;
    email: string;
    role: UserRole;
    revendaId?: string | null;
}
export interface JwtPayloadWithRefresh extends JwtPayload {
    refreshToken?: string;
}
