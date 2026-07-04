export async function buscarClimaPorDestino(destino: string) {
  const response = await fetch(
    `https://wttr.in/${encodeURIComponent(destino)}?format=j1`
  );

  if (!response.ok) {
    throw new Error("Erro ao buscar clima");
  }

  const dados = await response.json();

  return {
    destino,
    pais: "",
    temperatura: dados.current_condition[0].temp_C,
    vento: dados.current_condition[0].windspeedKmph,
    horario: dados.current_condition[0].localObsDateTime,
  };
}