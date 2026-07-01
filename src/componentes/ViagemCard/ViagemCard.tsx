"use client";

import Link from "next/link";
import { Viagem } from "@/tipos/viagem"
import '@/componentes/ViagemCard/ViagemCard.css';
import Image from "next/image";

interface ViagemCardProps {
  viagem: Viagem;
  onDelete: (id: number) => void;
}

export default function ViagemCard({ viagem, onDelete}: ViagemCardProps) {
  return (
    <div className="card">

      <Image
        src={viagem.imagem}
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

        <button onClick={() => onDelete?.(viagem.id)}>
          Excluir
        </button>
      </div>
    </div>
  );
}