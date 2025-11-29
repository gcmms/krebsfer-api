import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { RevendasController } from './revendas.controller';
import { RevendasService } from './revendas.service';

@Module({
  imports: [PrismaModule],
  controllers: [RevendasController],
  providers: [RevendasService],
  exports: [RevendasService],
})
export class RevendasModule {}
