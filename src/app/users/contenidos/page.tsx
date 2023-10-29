
import CompPaginas from '@/app/components/paginas/Comppaginas';
import type { Constantes, Pagina } from '@/models/MetricasApi'
import { constantesData, getPaginas } from '@/utils/metricas'
import React from 'react'

const pageContenidos = async () => {
    const paginas: Pagina[] = await getPaginas();
    const constantes: Constantes[] = await constantesData();


    return (


        <CompPaginas paginas={paginas} constantes={constantes} />

    )
}

export default pageContenidos