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

export enum OrcamentoStatusDto {
  RASCUNHO = 'rascunho',
  APROVADO = 'aprovado',
  PEDIDO_CRIADO_SAP = 'pedido_criado_sap',
  FINALIZADO = 'finalizado',
}

export class CreateOrcamentoDto {
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
