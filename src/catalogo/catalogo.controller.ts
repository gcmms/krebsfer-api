import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CatalogoService } from './catalogo.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';

@ApiTags('catalogo')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('catalogo')
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
}
