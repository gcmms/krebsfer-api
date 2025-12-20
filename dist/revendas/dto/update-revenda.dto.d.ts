import { CreateRevendaDto } from './create-revenda.dto';
declare const UpdateRevendaDto_base: import("@nestjs/common").Type<Partial<CreateRevendaDto>>;
export declare class UpdateRevendaDto extends UpdateRevendaDto_base {
    municipiosAtuacao?: string[];
    nome?: string;
    cnpjCpf?: string;
    inscricaoEstadual?: string;
    emailPrincipal?: string;
    emailContato?: string;
    telefoneFixo?: string;
    telefoneContato?: string;
    enderecoCompleto?: string;
    aliquotaDesconto?: number;
    comissao?: number;
}
export {};
