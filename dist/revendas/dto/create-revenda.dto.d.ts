export declare class CreateRevendaDto {
    nome: string;
    cnpjCpf: string;
    inscricaoEstadual?: string;
    dataCadastro?: Date;
    emailPrincipal: string;
    emailContato?: string;
    telefoneFixo?: string;
    telefoneContato?: string;
    enderecoCompleto: string;
    aliquotaDesconto?: number;
    comissao?: number;
    municipiosAtuacao: string[];
}
