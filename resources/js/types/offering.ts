export interface Offering {
    id: number;
    descricao: string;
    duracao: number;
    preco: string;
    ativo: boolean;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
}
