export async function validarDestino(destino: string): Promise<boolean> {
  const response = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(destino)}&count=1&language=pt&format=json`
  );

  if (!response.ok) {
    return false;
  }

  const dados = await response.json();

  return dados.results && dados.results.length > 0;
}