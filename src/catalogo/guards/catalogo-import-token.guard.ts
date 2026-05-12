import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserRole } from '@prisma/client';

@Injectable()
export class CatalogoImportTokenGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const expectedToken = this.configService.get<string>('CATALOGO_IMPORT_TOKEN')?.trim();

    if (!expectedToken) {
      throw new UnauthorizedException('Token de importacao do catalogo nao configurado');
    }

    const request = context.switchToHttp().getRequest();
    const authorization = String(request.headers?.authorization || '');
    const token = authorization.replace(/^Bearer\s+/i, '').trim();

    if (!token || token !== expectedToken) {
      throw new UnauthorizedException('Token de importacao do catalogo invalido');
    }

    request.user = {
      sub: 'catalogo-import-service',
      email: 'catalogo-import-service',
      role: UserRole.ADMIN,
    };

    return true;
  }
}
