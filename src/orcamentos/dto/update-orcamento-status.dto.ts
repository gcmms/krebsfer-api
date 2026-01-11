import { IsEnum } from 'class-validator';
import { OrcamentoStatusDto } from './create-orcamento.dto';

export class UpdateOrcamentoStatusDto {
  @IsEnum(OrcamentoStatusDto)
  status: OrcamentoStatusDto;
}
