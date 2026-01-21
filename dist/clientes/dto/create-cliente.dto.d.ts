export declare class CreateClienteDto {
    nome: string;
    cnpjCpf: string;
    inscricaoEstadual?: string;
    dataCadastro?: Date;
    emailPrincipal: string;
    emailContato?: string;
    telefoneFixo?: string;
    telefoneContato?: string;
    enderecoCompleto: string;
    uf: string;
    revendaIds: string[];
}
