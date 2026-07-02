import ViagemGrid from "@/componentes/ViagensGrid/ViagensGrid";
import { getViagens } from "@/services/viagem.services";
import Link from "next/link";
import styles from '@/app/page.module.css';
import { cookies } from "next/headers";
import { redirect } from "next/navigation";


export default async function Home() {
  
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  const token = cookieStore.get("token");

  if(!token)
  {
    redirect('/login');
  }

  const viagens = await getViagens(cookieHeader);

  return (
    <main className={styles.home}>
      <header className={styles.homeHeader}>
          <div>
              <h1> ✈️ Viagens</h1>
              <p>Gerencie suas viagens</p>
          </div>

          <Link href="/viagens/criar" className={styles.btnAdd}>
            + Adicionar Viagem
          </Link>
      </header>
      <ViagemGrid viagens={viagens} />
    </main>
  );
}