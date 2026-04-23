import { ArrayMinSize, IsArray, IsString } from 'class-validator';

export class DeleteOrcamentosDto {
  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  ids: string[];

  @IsString()
  senha: string;
}
