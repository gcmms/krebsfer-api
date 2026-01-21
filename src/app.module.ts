import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { RevendasModule } from './revendas/revendas.module';
import { UsersModule } from './users/users.module';
import { ClientesModule } from './clientes/clientes.module';
import { CatalogoModule } from './catalogo/catalogo.module';
import { OrcamentosModule } from './orcamentos/orcamentos.module';
import { DashboardModule } from './dashboard/dashboard.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    UsersModule,
    RevendasModule,
    ClientesModule,
    CatalogoModule,
    OrcamentosModule,
    DashboardModule,
  ],
})
export class AppModule {}
