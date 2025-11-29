import {
  ArrayNotEmpty,
  IsArray,
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateRevendaDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsString()
  @IsNotEmpty()
  cnpjCpf: string;

  @IsOptional()
  @IsString()
  inscricaoEstadual?: string;

  @IsOptional()
  @IsDateString()
  dataCadastro?: Date;

  @IsNumber()
  @Type(() => Number)
  markupPadrao: number;

  @IsNumber()
  @Type(() => Number)
  descontoMaximo: number;

  @IsEmail()
  emailPrincipal: string;

  @IsOptional()
  @IsEmail()
  emailContato?: string;

  @IsOptional()
  @IsString()
  telefoneFixo?: string;

  @IsOptional()
  @IsString()
  telefoneContato?: string;

  @IsString()
  @IsNotEmpty()
  enderecoCompleto: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  aliquotaDesconto?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  comissao?: number;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  municipiosAtuacao: string[];
}
