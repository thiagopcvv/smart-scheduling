export interface Client {
    id: number;
    nome: string;
    cpf: string;
    email: string;
    telefone: string | null;
    rua: string | null;
    bairro: string | null;
    cidade: string | null;
    uf: string | null;
    numero: string | null;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
}
