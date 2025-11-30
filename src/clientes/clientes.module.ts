import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { ClientesService } from './clientes.service';
import { ClientesController } from './clientes.controller';

@Module({
  imports: [PrismaModule],
  controllers: [ClientesController],
  providers: [ClientesService],
})
export class ClientesModule {}
