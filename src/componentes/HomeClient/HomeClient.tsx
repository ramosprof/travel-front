"use client";

import { useState } from "react";
import { Viagem } from "@/tipos/viagem";
import ViagemGrid from "@/componentes/ViagensGrid/ViagensGrid";
import WeatherSidebar from "@/componentes/WeatherSidebar/WeatherSidebar";
import styles from "@/app/page.module.css";

interface Props {
  viagens: Viagem[];
}

export default function HomeClient({ viagens }: Props) {
  const [viagemSelecionada, setViagemSelecionada] =
    useState<Viagem | null>(viagens[0] ?? null);

  return (
    <div className={styles.content}>

    <WeatherSidebar viagem={viagemSelecionada} />

    <ViagemGrid
        viagens={viagens}
        viagemSelecionada={viagemSelecionada}
        onSelectViagem={setViagemSelecionada}
    />

</div>
  );
}