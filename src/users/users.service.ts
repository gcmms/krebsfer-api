import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User, UserRole } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from '../auth/interfaces/jwt-payload.interface';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateUserDto, requester: JwtPayload): Promise<Omit<User, 'senha' | 'refreshToken'>> {
    const role = dto.role ?? UserRole.USUARIO_REVENDA;

    if (role !== UserRole.ADMIN && !dto.revendaId) {
      throw new BadRequestException('revendaId é obrigatório para este perfil');
    }

    if (requester.role !== UserRole.ADMIN) {
      if (!requester.revendaId) {
        throw new ForbiddenException('Usuário sem revenda vinculada');
      }
      if (dto.revendaId && dto.revendaId !== requester.revendaId) {
        throw new ForbiddenException('Você só pode criar usuários da sua revenda');
      }
      if (role === UserRole.ADMIN) {
        throw new ForbiddenException('Somente ADMIN pode criar outro ADMIN');
      }
    }

    await this.ensureRevendaExists(dto.revendaId);
    await this.ensureEmailAvailable(dto.email);

    const hashedPassword = await bcrypt.hash(dto.senha, 10);
    const user = await this.prisma.user.create({
      data: {
        nome: dto.nome,
        email: dto.email,
        senha: hashedPassword,
        telefone: dto.telefone,
        dataNasc: dto.dataNasc ? new Date(dto.dataNasc) : undefined,
        role,
        revendaId: dto.revendaId ?? null,
      },
    });

    return this.sanitize(user);
  }

  async findAll(requester: JwtPayload) {
    if (requester.role === UserRole.ADMIN) {
      const users = await this.prisma.user.findMany({
        include: { revenda: true },
        orderBy: { createdAt: 'desc' },
      });
      return users.map((user) => this.sanitize(user));
    }

    if (requester.role === UserRole.GERENTE_REVENDA) {
      if (!requester.revendaId) {
        throw new ForbiddenException('Usuário sem revenda vinculada');
      }
      const users = await this.prisma.user.findMany({
        where: { revendaId: requester.revendaId },
        include: { revenda: true },
        orderBy: { createdAt: 'desc' },
      });
      return users.map((user) => this.sanitize(user));
    }

    throw new ForbiddenException('Acesso negado');
  }

  async findMe(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { revenda: true },
    });
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }
    return this.sanitize(user);
  }

  async update(
    id: string,
    dto: UpdateUserDto,
    requester: JwtPayload,
  ): Promise<Omit<User, 'senha' | 'refreshToken'>> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    if (requester.role !== UserRole.ADMIN) {
      if (
        !requester.revendaId ||
        user.revendaId !== requester.revendaId ||
        (dto.revendaId && dto.revendaId !== requester.revendaId)
      ) {
        throw new ForbiddenException('Você só pode atualizar usuários da sua revenda');
      }
      if (user.role === UserRole.ADMIN || dto.role === UserRole.ADMIN) {
        throw new ForbiddenException('Somente ADMIN pode alterar perfil ADMIN');
      }
    }

    if (dto.role === UserRole.ADMIN && requester.role !== UserRole.ADMIN) {
      throw new ForbiddenException('Somente ADMIN pode definir perfil ADMIN');
    }

    if (dto.revendaId) {
      await this.ensureRevendaExists(dto.revendaId);
    }

    if (dto.email && dto.email !== user.email) {
      await this.ensureEmailAvailable(dto.email);
    }

    let hashedPassword: string | undefined;
    if (dto.senha) {
      hashedPassword = await bcrypt.hash(dto.senha, 10);
    }

    const updated = await this.prisma.user.update({
      where: { id },
      data: {
        nome: dto.nome ?? user.nome,
        email: dto.email ?? user.email,
        telefone: dto.telefone ?? user.telefone,
        dataNasc: dto.dataNasc ? new Date(dto.dataNasc) : user.dataNasc,
        role: dto.role ?? user.role,
        revendaId:
          requester.role === UserRole.ADMIN
            ? dto.revendaId ?? user.revendaId
            : requester.revendaId,
        senha: hashedPassword ?? user.senha,
      },
    });

    return this.sanitize(updated);
  }

  async remove(id: string, requester: JwtPayload) {
    if (requester.role !== UserRole.ADMIN) {
      throw new ForbiddenException('Somente ADMIN pode remover usuários');
    }

    if (requester.sub === id) {
      throw new ForbiddenException('Você não pode remover o próprio usuário');
    }

    const exists = await this.prisma.user.findUnique({ where: { id } });
    if (!exists) {
      throw new NotFoundException('Usuário não encontrado');
    }

    await this.prisma.user.delete({ where: { id } });
    return { message: 'Usuário removido com sucesso' };
  }

  private sanitize<T extends { senha?: string | null; refreshToken?: string | null }>(
    user: T,
  ) {
    const { senha, refreshToken, ...rest } = user;
    return rest;
  }

  private async ensureEmailAvailable(email: string) {
    const existing = await this.prisma.user.findUnique({ where: { email } });
    if (existing) {
      throw new BadRequestException('E-mail já cadastrado');
    }
  }

  private async ensureRevendaExists(revendaId?: string | null) {
    if (!revendaId) {
      return;
    }
    const revenda = await this.prisma.revenda.findUnique({
      where: { id: revendaId },
    });
    if (!revenda) {
      throw new BadRequestException('Revenda informada não encontrada');
    }
  }
}
