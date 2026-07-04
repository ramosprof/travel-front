"use client";

import Link from "next/link";
import { Viagem } from "@/tipos/viagem"
import '@/componentes/ViagemCard/ViagemCard.css';
import Image from "next/image";

interface ViagemCardProps {
  viagem: Viagem;
  selecionado?: boolean;
  onDelete: (id: number) => void;
  onSelect?: (viagem: Viagem) => void;
}

export default function ViagemCard({ viagem, selecionado, onDelete, onSelect,}: ViagemCardProps) {
  return (
    <div
    className={`card ${selecionado ? "card-selecionado" : ""}`}
    onClick={() => onSelect?.(viagem)}
    >

      <Image
        src={viagem.imagem || "/header-bg.png"}
        alt={viagem.titulo} 
        width={300}
        height={450}
        className="card-img"
      />

      <h2>{viagem.titulo}</h2>

      <p>⭐ {viagem.nota}</p>

      <div className="btn-acoes">

        <Link href={`/viagens/${viagem.id}/editar`}>
          Editar
        </Link>

        <button onClick={(e) => {e.stopPropagation();
                                onDelete?.(viagem.id)}}>
          Excluir
        </button>

        
      </div>
    </div>
  );
}