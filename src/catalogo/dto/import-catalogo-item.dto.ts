import { IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class ImportCatalogoItemDto {
  @IsString()
  @IsNotEmpty()
  itemCode: string;

  @IsString()
  @IsNotEmpty()
  itemName: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsOptional()
  @IsString()
  salUnitMsr?: string;

  @IsOptional()
  @IsString()
  ncmCode?: string;

  @IsString()
  @IsNotEmpty()
  categoria: string;

  @IsString()
  @IsNotEmpty()
  subcategoria: string;
}
