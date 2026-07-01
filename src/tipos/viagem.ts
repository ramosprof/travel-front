export interface Viagem {
    id: number;
    titulo: string;
    imagem: string;
    nota: number;
}

export interface CreateViagemDTO  {
    titulo: string;
    imagem: string;
    nota: number;
}

export interface UpdateViagemDTO  {
    titulo?: string;
    imagem?: string;
    nota?: number;
}