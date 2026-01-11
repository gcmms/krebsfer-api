import { IsInt, IsNumber, IsPositive, IsString, Min } from 'class-validator';

export class CreateOrcamentoItemDto {
  @IsString()
  itemCode: string;

  @IsString()
  itemName: string;

  @IsInt()
  @Min(1)
  quantidade: number;

  @IsNumber()
  @IsPositive()
  precoCheio: number;

  @IsNumber()
  @IsPositive()
  precoDesconto: number;

  @IsNumber()
  @Min(0)
  imposto01: number;

  @IsNumber()
  @Min(0)
  imposto02: number;

  @IsNumber()
  @Min(0)
  imposto03: number;

  @IsNumber()
  @IsPositive()
  precoFinal: number;
}
