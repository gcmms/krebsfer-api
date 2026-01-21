import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';
import { ImportCatalogoItemDto } from './import-catalogo-item.dto';

export class ImportCatalogoDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ImportCatalogoItemDto)
  itens: ImportCatalogoItemDto[];
}
