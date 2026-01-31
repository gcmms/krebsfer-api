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
import { JwtPayload } from '../auth/interfaces/jwt-payload.interface';
import { GetUser } from '../common/decorators/get-user.decorator';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UserRole } from '@prisma/client';
import { CreateRevendaDto } from './dto/create-revenda.dto';
import { UpdateRevendaDto } from './dto/update-revenda.dto';
import { RevendasService } from './revendas.service';

@ApiTags('revendas')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('revendas')
export class RevendasController {
  constructor(private readonly revendasService: RevendasService) {}

  @Roles(UserRole.ADMIN)
  @Post()
  create(
    @Body() dto: CreateRevendaDto,
    @GetUser() user: JwtPayload,
  ) {
    return this.revendasService.create(dto, user);
  }

  @Get()
  findAll(@GetUser() user: JwtPayload) {
    return this.revendasService.findAll(user);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @GetUser() user: JwtPayload) {
    return this.revendasService.findOne(id, user);
  }

  @Roles(UserRole.ADMIN, UserRole.GERENTE_REVENDA)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateRevendaDto,
    @GetUser() user: JwtPayload,
  ) {
    return this.revendasService.update(id, dto, user);
  }

  @Roles(UserRole.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string, @GetUser() user: JwtPayload) {
    return this.revendasService.remove(id, user);
  }
}
