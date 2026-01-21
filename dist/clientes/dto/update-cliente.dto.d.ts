import { CreateClienteDto } from './create-cliente.dto';
declare const UpdateClienteDto_base: import("@nestjs/common").Type<Partial<CreateClienteDto>>;
export declare class UpdateClienteDto extends UpdateClienteDto_base {
    nome?: string;
    cnpjCpf?: string;
    inscricaoEstadual?: string;
    dataCadastro?: Date;
    emailPrincipal?: string;
    emailContato?: string;
    telefoneFixo?: string;
    telefoneContato?: string;
    enderecoCompleto?: string;
    uf?: string;
    revendaIds?: string[];
}
export {};
