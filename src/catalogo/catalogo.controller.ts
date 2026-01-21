import { Body, Controller, Get, Post, Query, UseGuards, VERSION_NEUTRAL } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { CatalogoService } from './catalogo.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { ImportCatalogoDto } from './dto/import-catalogo.dto';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '@prisma/client';

@ApiTags('catalogo')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller({ path: ['catalogo', 'catalago'], version: ['1', VERSION_NEUTRAL] })
export class CatalogoController {
  constructor(private readonly catalogoService: CatalogoService) {}

  @Get()
  findAll(
    @Query('search') search?: string,
    @Query('skip') skip?: string,
    @Query('take') take?: string,
  ) {
    const parsedSkip = skip ? Number(skip) : 0;
    const parsedTake = take ? Number(take) : 5000;

    return this.catalogoService.findAll({
      search: search?.trim() || undefined,
      skip: Number.isFinite(parsedSkip) ? parsedSkip : 0,
      take: Number.isFinite(parsedTake) ? parsedTake : 5000,
    });
  }

  @Roles(UserRole.ADMIN)
  @Post('import')
  @ApiBody({ type: ImportCatalogoDto })
  importCatalogo(@Body() dto: ImportCatalogoDto) {
    return this.catalogoService.importCatalogo(dto.itens);
  }
}
