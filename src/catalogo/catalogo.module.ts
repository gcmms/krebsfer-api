import { Module } from '@nestjs/common';
import { CatalogoController } from './catalogo.controller';
import { CatalogoService } from './catalogo.service';
import { CatalogoImportTokenGuard } from './guards/catalogo-import-token.guard';

@Module({
  controllers: [CatalogoController],
  providers: [CatalogoService, CatalogoImportTokenGuard],
})
export class CatalogoModule {}
