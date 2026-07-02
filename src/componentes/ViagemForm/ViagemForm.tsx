"use client";

import '@/componentes/ViagemForm/ViagemForm.css'
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Viagem } from "@/tipos/viagem";
import {
  createViagens,
  updateViagem,
} from "@/services/viagem.services"

interface Props {
  viagem?: Viagem;
}

export default function ViagemForm({ viagem }: Props) {
  const router = useRouter();

    const [titulo, setTitulo] = useState(
    viagem?.titulo ?? ""
    );

    const [imagem, setImagem] = useState(
    viagem?.imagem ?? ""
    );

    const [nota, setNota] = useState(
    viagem?.nota ?? 0
    );
   
    async function handleSubmit( e: React.SyntheticEvent) {
        e.preventDefault();

        const payload = {
            titulo,
            imagem,
            nota,
        };

        if (viagem) {
            await updateViagem( viagem.id, payload);
        } else {
            await createViagens(payload);
        }

        router.push("/");
        router.refresh();
    }

    return (
        <form onSubmit={handleSubmit} className="viagem-form">
        <h1>
        {viagem
            ? "Editar Viagem"
            : "Nova Viagem"}
        </h1>
        <div className="form-input">
            <input
                value={titulo}
                onChange={(e) =>
                setTitulo(e.target.value)
            }
            placeholder="Título"
        />
        </div>
        <div className="form-input">
            <input
                value={imagem}
                onChange={(e) =>
                setImagem(e.target.value)
                }
            placeholder="URL Imagem"
        />
        </div>
        <div className="form-input">
            <input
                type="number"
                defaultValue={nota}
                onChange={(e) =>
                setNota(Number(e.target.value))
                }
            />
        </div>
        <button type="submit">
            Salvar
        </button>
        </form>
    );
}