import { IsString, MinLength } from 'class-validator';

export class UpdatePedidoSapDto {
  @IsString()
  @MinLength(1)
  numeroPedidoSap: string;
}
