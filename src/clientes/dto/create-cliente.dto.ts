import {
  ArrayNotEmpty,
  IsArray,
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateClienteDto {
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

  @IsString()
  @IsNotEmpty()
  uf: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  revendaIds: string[];
}
