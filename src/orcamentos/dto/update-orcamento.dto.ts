import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateOrcamentoItemDto } from './create-orcamento-item.dto';
import { OrcamentoStatusDto } from './create-orcamento.dto';

export class UpdateOrcamentoDto {
  @IsString()
  clienteId: string;

  @IsString()
  revendaId: string;

  @IsOptional()
  @IsBoolean()
  comissionado?: boolean;

  @IsOptional()
  @IsString()
  referenciaPedido?: string;

  @IsOptional()
  @IsString()
  observacoes?: string;

  @IsOptional()
  @IsEnum(OrcamentoStatusDto)
  status?: OrcamentoStatusDto;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOrcamentoItemDto)
  itens: CreateOrcamentoItemDto[];
}
