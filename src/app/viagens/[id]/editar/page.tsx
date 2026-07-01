import ViagemForm from "@/componentes/ViagemForm/ViagemForm";
import { getViagem } from "@/services/viagem.services";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";


interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditarViagemPage({
  params,
}: Props) {
  const { id } = await params;

  const cookieStore = await cookies();

  const cookieHeader = cookieStore.toString();

  const token = cookieStore.get("token");

  if(!token)
    redirect('/login');

  const viagem = await getViagem(id, cookieHeader);

  return (
    <>
      <ViagemForm viagem={viagem} />
    </>
  );
}