import ViagemForm from "@/componentes/ViagemForm/ViagemForm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";


export default async function CriarViagemPage() {

    const cookieStore = await cookies();
  
    const token = cookieStore.get("token");
  
    if(!token)
      redirect('/login');

  return (
    <>
      <ViagemForm />
    </>
  );
}