import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { OrcamentosService } from './orcamentos.service';
import { CreateOrcamentoDto } from './dto/create-orcamento.dto';
import { UpdateOrcamentoStatusDto } from './dto/update-orcamento-status.dto';
import { UpdateOrcamentoDto } from './dto/update-orcamento.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { GetUser } from '../common/decorators/get-user.decorator';
import { JwtPayload } from '../auth/interfaces/jwt-payload.interface';

@ApiTags('orcamentos')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('orcamentos')
export class OrcamentosController {
  constructor(private readonly orcamentosService: OrcamentosService) {}

  @Post()
  create(@Body() dto: CreateOrcamentoDto, @GetUser() user: JwtPayload) {
    return this.orcamentosService.create(dto, user);
  }

  @Get()
  findAll() {
    return this.orcamentosService.findAll();
  }

  @Get('portal-comercial')
  findPortalComercial() {
    return this.orcamentosService.findPortalComercial();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orcamentosService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateOrcamentoDto) {
    return this.orcamentosService.update(id, dto);
  }

  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body() dto: UpdateOrcamentoStatusDto) {
    return this.orcamentosService.updateStatus(id, dto.status);
  }
}
