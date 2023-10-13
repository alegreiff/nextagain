import { Constantes, Resumen } from "@/models/MetricasApi"
import { constantesData, generalData } from "@/utils/metricas"
import CompInicio from "./components/paginas/CompInicio";



export default async function Home() {

  const datosGenerales: Resumen[] = await generalData();
  const constantes: Constantes[] = await constantesData();




  return (

    <>

      <CompInicio datosGenerales={datosGenerales} constantes={constantes} />
    </>
  )
}
