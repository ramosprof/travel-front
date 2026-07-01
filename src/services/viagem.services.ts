import {Viagem, CreateViagemDTO, UpdateViagemDTO} from "@/tipos/viagem";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL;

export async function getViagens(cookieHeader?: string): Promise<Viagem[]>
{
    const response = await fetch(`${API_URL}/viagens`,{
        headers: {
            Cookie: cookieHeader ?? "",
        }
    });
    
    if (!response.ok) {
        throw new Error("Não autenticado");
    }

    const dados = await response.json();

    return dados;

}

export async function getViagem(id: string, cookieHeader?: string): Promise<Viagem> {
  
 
    const response = await fetch(`${API_URL}/viagens/${id}`,{
        headers: {
            Cookie: cookieHeader ?? ""
        }
    });

    if (!response.ok) {
        throw new Error("Não autenticado");
    }

    return response.json();
}

export async function createViagens(viagem: CreateViagemDTO): Promise<void>
{
    const response = await fetch(`${API_URL}/viagens`,{
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(viagem),
    });

    if (!response.ok) {
        throw new Error("Erro");
    }
}


export async function updateViagem(id: number, viagem: UpdateViagemDTO): Promise<void>
{
    const response = await fetch(`${API_URL}/viagens/${id}`,{
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(viagem),
    });

    if (!response.ok) {
        throw new Error("Erro");
    }
}

export async function deleteViagem(id: number): Promise<void>
{
    await fetch(`${API_URL}/viagens/${id}`,{
        method: "DELETE",
        credentials: "include",
    });
}