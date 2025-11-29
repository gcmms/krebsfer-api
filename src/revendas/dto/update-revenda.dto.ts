import { PartialType } from '@nestjs/swagger';
import { IsArray, IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateRevendaDto } from './create-revenda.dto';

export class UpdateRevendaDto extends PartialType(CreateRevendaDto) {
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  municipiosAtuacao?: string[];

  @IsOptional()
  @IsString()
  nome?: string;

  @IsOptional()
  @IsString()
  cnpjCpf?: string;

  @IsOptional()
  @IsString()
  inscricaoEstadual?: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  markupPadrao?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  descontoMaximo?: number;

  @IsOptional()
  @IsEmail()
  emailPrincipal?: string;

  @IsOptional()
  @IsEmail()
  emailContato?: string;

  @IsOptional()
  @IsString()
  telefoneFixo?: string;

  @IsOptional()
  @IsString()
  telefoneContato?: string;

  @IsOptional()
  @IsString()
  enderecoCompleto?: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  aliquotaDesconto?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  comissao?: number;
}
