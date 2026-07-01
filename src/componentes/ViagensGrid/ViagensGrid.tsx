"use client";

import { useRouter } from "next/navigation";
import { Viagem } from "@/tipos/viagem";

import { deleteViagem } from "@/services/viagem.services";
import ViagemCard from "../ViagemCard/ViagemCard";
import '@/componentes/ViagensGrid/ViagensGrid.css'

interface Props {
  viagens: Viagem[];
}

export default function ViagemGrid({ viagens }: Props) {

  const router = useRouter();

  async function handleDelete (id: number) {
    await deleteViagem(id);
    router.refresh();
  }

  const viagensMap = viagens.map((f) => {
    return <ViagemCard 
        key={f.id}
        viagem={f}
        onDelete={handleDelete}
    />
  }); 

  return (
    <div className="grid">
      {viagensMap}
    </div>
  );
}