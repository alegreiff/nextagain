import { DatoIdioma, Idiomas, ListaIdiomas } from '@/models/MetricasApi'
import React, { useEffect, useState } from 'react'
import _uniq from "lodash/uniqBy";
import _sumBy from "lodash/sumBy";
import _orderBy from "lodash/orderBy";


interface Props {
    datosIdiomas: Idiomas[]
    tipo: string,
    mes: number,
    year: number,
    listaIdiomas: ListaIdiomas[]
}

const CajaIdioma = ({ datosIdiomas, year, mes, tipo, listaIdiomas }: Props) => {


    const [datoIdioma, setDatoIdioma] = useState(datosIdiomas);
    const [idiomaDatos, setIdiomaDatos] = useState<DatoIdioma[]>();
    const rangos = listaIdiomas

    useEffect(() => {
        let datos = datosIdiomas;
        if (year > 0 && mes === 0) {
            datos = datos.filter(dato => dato.y === year)

        } else if (year > 0 && mes > 0) {
            datos = datos.filter(dato => dato.y === year)
            datos = datos.filter(dato => dato.m === mes)
        }


        let salida: DatoIdioma[] = []

        for (let i = 0; i < rangos.length; i++) {
            let resultado = datos.filter(dato => dato.idioma === rangos[i].id)
            let sesiones = _sumBy(resultado, 's')
            let usuarios = _sumBy(resultado, 'u')


            if (usuarios > 0 && sesiones > 0) {
                salida.push(
                    { rango: rangos[i].id, sesiones, usuarios }
                )
            }


        }
        salida = _orderBy(salida, ['sesiones', 'usuarios'], ['desc', 'desc'])


        setDatoIdioma(datos)
        setIdiomaDatos(salida)

    }, [datosIdiomas, year, mes, rangos])

    const size = datoIdioma.length;
    return (
        <>
            <div className='bg-sky-700 p-8'><span>YEAR:  {year} </span>
                <span>MES:  {mes} </span>
                CajaIdioma - SIZE: {size} -TIPO:  {tipo}  </div>
            <pre>
                {JSON.stringify(idiomaDatos, undefined, 2)}
            </pre>

        </>
    )
}

export default CajaIdioma