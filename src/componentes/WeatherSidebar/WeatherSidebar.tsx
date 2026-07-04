"use client";

import { useEffect, useState } from "react";
import { Viagem } from "@/tipos/viagem";
import { buscarClimaPorDestino } from "@/services/clima.services";
import "./WeatherSidebar.css";

interface Props {
  viagem: Viagem | null;
}

interface Clima {
  destino: string;
  pais: string;
  temperatura: number;
  vento: number;
  horario: string;
}

export default function WeatherSidebar({ viagem }: Props) {
  const [clima, setClima] = useState<Clima | null>(null);
  const [erro, setErro] = useState("");
  const [visivel, setVisivel] = useState(false);

  async function carregarClima() {
    try {
      setErro("");

      if (!viagem) {
        setErro("Selecione uma viagem.");
        return;
      }

      const dados = await buscarClimaPorDestino(viagem.titulo);
      setClima(dados);
    } catch (error) {
      console.error(error);
      setErro("Não foi possível carregar o clima.");
      setClima(null);
    }
  }

  useEffect(() => {
    if (!viagem) return;

    carregarClima();

    setVisivel(true);

    const esconder = setTimeout(() => {
      setVisivel(false);
    }, 5000);

    return () => clearTimeout(esconder);
  }, [viagem]);

  return (
    <aside className={`weather-sidebar ${visivel ? "mostrar" : "esconder"}`}>
      <h2>Clima do destino</h2>

      {erro && <p>{erro}</p>}

      {clima && (
        <div className="weather-card">
          <h3> {clima.destino}</h3>
          <p>{clima.pais}</p>
          <p>🌡️ {clima.temperatura}°C</p>
          <p>💨 Vento: {clima.vento} km/h</p>
          <small>Atualizado: {clima.horario}</small>
        </div>
      )}
    </aside>
  );
}