import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserRole } from '@prisma/client';
import { OrcamentosService } from './orcamentos.service';
import { CreateOrcamentoDto } from './dto/create-orcamento.dto';
import { UpdateOrcamentoStatusDto } from './dto/update-orcamento-status.dto';
import { UpdateOrcamentoDto } from './dto/update-orcamento.dto';
import { UpdatePedidoSapDto } from './dto/update-pedido-sap.dto';
import { DeleteOrcamentosDto } from './dto/delete-orcamentos.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { GetUser } from '../common/decorators/get-user.decorator';
import { JwtPayload } from '../auth/interfaces/jwt-payload.interface';
import { Roles } from '../common/decorators/roles.decorator';

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
  findAll(@GetUser() user: JwtPayload) {
    return this.orcamentosService.findAll(user);
  }

  @Get('portal-comercial')
  findPortalComercial() {
    return this.orcamentosService.findPortalComercial();
  }

  @Roles(UserRole.ADMIN)
  @Delete()
  removeMany(@Body() dto: DeleteOrcamentosDto, @GetUser() user: JwtPayload) {
    return this.orcamentosService.removeMany(dto, user);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @GetUser() user: JwtPayload) {
    return this.orcamentosService.findOne(id, user);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateOrcamentoDto) {
    return this.orcamentosService.update(id, dto);
  }

  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body() dto: UpdateOrcamentoStatusDto) {
    return this.orcamentosService.updateStatus(id, dto.status);
  }

  @Patch(':id/pedido-sap')
  updatePedidoSap(@Param('id') id: string, @Body() dto: UpdatePedidoSapDto) {
    return this.orcamentosService.updatePedidoSap(id, dto);
  }
}
