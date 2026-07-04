"use client";

import { useRouter } from "next/navigation";
import { Viagem } from "@/tipos/viagem";

import { deleteViagem } from "@/services/viagem.services";
import ViagemCard from "../ViagemCard/ViagemCard";
import '@/componentes/ViagensGrid/ViagensGrid.css'

interface Props {
  viagens: Viagem[];
  viagemSelecionada?: Viagem | null;
  onSelectViagem?: (viagem: Viagem) => void;
  
}

export default function ViagemGrid({ viagens, viagemSelecionada, onSelectViagem }: Props) {

  const router = useRouter();

  async function handleDelete (id: number) {
    await deleteViagem(id);
    router.refresh();
  }

  const viagensMap = viagens.map((f) => {
    return <ViagemCard 
        key={f.id}
        viagem={f}
        selecionado={viagemSelecionada?.id === f.id}
        onDelete={handleDelete}
        onSelect={onSelectViagem}
    />
  }); 

  return (
    <div className="grid">
      {viagensMap}
    </div>
  );
}