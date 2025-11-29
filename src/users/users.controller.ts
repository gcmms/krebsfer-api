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
import { GetUser } from '../common/decorators/get-user.decorator';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { JwtPayload } from '../auth/interfaces/jwt-payload.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { UserRole } from '@prisma/client';

@ApiTags('users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Roles(UserRole.ADMIN, UserRole.GERENTE_REVENDA)
  @Post()
  create(
    @Body() dto: CreateUserDto,
    @GetUser() user: JwtPayload,
  ) {
    return this.usersService.create(dto, user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  me(@GetUser() user: JwtPayload) {
    return this.usersService.findMe(user.sub);
  }

  @Roles(UserRole.ADMIN, UserRole.GERENTE_REVENDA)
  @Get()
  findAll(@GetUser() user: JwtPayload) {
    return this.usersService.findAll(user);
  }

  @Roles(UserRole.ADMIN, UserRole.GERENTE_REVENDA)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateUserDto,
    @GetUser() user: JwtPayload,
  ) {
    return this.usersService.update(id, dto, user);
  }

  @Roles(UserRole.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string, @GetUser() user: JwtPayload) {
    return this.usersService.remove(id, user);
  }
}
