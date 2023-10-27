import CompUsuarios from '@/app/components/Usuarios/CompUsuarios';
import { Adquisicion, Constantes, Edades, Genero, Idiomas, ListaIdiomas, Tecno } from '@/models/MetricasApi';
import { constantesData, getAdquis, getEdades, getGenero, getIdiomas, getListaIdiomas, getTecno } from '@/utils/metricas'
import React from 'react'

const pageUsuarios = async () => {
    const datosEdades: Edades[] = await getEdades();
    const datosGenero: Genero[] = await getGenero();
    const datosIdiomas: Idiomas[] = await getIdiomas();
    const datosTecno: Tecno[] = await getTecno();
    const datosAdquis: Adquisicion[] = await getAdquis();
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
                datosTecno={datosTecno}
                datosAdquis={datosAdquis}
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