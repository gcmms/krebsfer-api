import { PartialType } from '@nestjs/swagger';
import { CreateClienteDto } from './create-cliente.dto';
import { IsOptional, IsString, IsEmail, IsDateString, IsArray } from 'class-validator';

export class UpdateClienteDto extends PartialType(CreateClienteDto) {
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
  @IsDateString()
  dataCadastro?: Date;

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
  @IsArray()
  @IsString({ each: true })
  revendaIds?: string[];
}
