import CompUsuarios from '@/app/components/Usuarios/CompUsuarios';
import { Constantes, Edades, Genero, Idiomas, ListaIdiomas } from '@/models/MetricasApi';
import { constantesData, getEdades, getGenero, getIdiomas, getListaIdiomas, getidiomas } from '@/utils/metricas'
import React from 'react'

const pageUsuarios = async () => {
    const datosEdades: Edades[] = await getEdades();
    const datosGenero: Genero[] = await getGenero();
    const datosIdiomas: Idiomas[] = await getIdiomas();
    const constantes: Constantes[] = await constantesData();
    const listaIdiomas: ListaIdiomas[] = await getListaIdiomas();
    return (
        <>
            <CompUsuarios
                datosEdades={datosEdades}
                constantes={constantes}
                datosGenero={datosGenero}
                datosIdiomas={datosIdiomas}
                listaIdiomas={listaIdiomas}
            />
            <div className='bg-red-100 text-4xl'>

                ¿Qué va en usuarios?
                <ol>
                    <li>- Idiomas</li>
                    <li>- Tecnología</li>
                    <li>- Adquisición</li>
                    <li>- Género  </li>
                    <li>- Edad  </li>


                </ol>

            </div>
        </>
    )
}

export default pageUsuarios