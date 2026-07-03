"use client";

import '@/componentes/ViagemForm/ViagemForm.css'
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Viagem } from "@/tipos/viagem";
import {
  createViagens,
  updateViagem,
} from "@/services/viagem.services"
import { validarDestino } from "@/services/destino.services";

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

        const destinoValido = await validarDestino(titulo);

        if (!destinoValido) {
        alert("Destino não encontrado. Verifique o nome digitado.");
        return;
        }

        if (!imagem.trim()) {
        alert("Informe a URL da imagem.");
        return;
        }


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
            <select
                value={nota}
                onChange={(e) => setNota(Number(e.target.value))}
            >
            {[...Array(11)].map((_, i) => (
                <option key={i} value={i}>
                    {i}
                </option>
             ))}
            </select>
        </div>
        <button type="submit">
            Salvar
        </button>
        </form>
    );
}