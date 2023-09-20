import { Resumen } from "@/models/MetricasApi"
import { generalData } from "@/utils/metricas"
import CompInicio from "./components/paginas/CompInicio";



export default async function Home() {

  const datosGenerales: Resumen[] = await generalData();




  return (

    <CompInicio datosGenerales={datosGenerales} />
  )
}
