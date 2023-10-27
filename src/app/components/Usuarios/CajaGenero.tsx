import { DatoGenero, Genero } from '@/models/MetricasApi'
import { rangosGenero } from '@/utils/baseData'
import React, { useEffect, useState } from 'react'
import _sumBy from "lodash/sumBy";

interface Props {
    datosGenero: Genero[]
    tipo: string,
    mes: number,
    year: number
}

const CajaGenero = ({ datosGenero, year, mes, tipo }: Props) => {

    const [datoGenero, setDatoGenero] = useState(datosGenero);
    const [generoDatos, setGeneroDatos] = useState<DatoGenero[]>()
    const rangos = rangosGenero;

    useEffect(() => {
        let datos = datosGenero;
        if (year > 0 && mes === 0) {
            datos = datos.filter(dato => dato.y === year)

        } else if (year > 0 && mes > 0) {
            datos = datos.filter(dato => dato.y === year)
            datos = datos.filter(dato => dato.m === mes)
        }


        let salida: DatoGenero[] = []

        for (let i = 0; i < rangos.length; i++) {
            let resultado = datos.filter(dato => dato.genero === rangos[i].rango)
            let sesiones = _sumBy(resultado, 's')
            let usuarios = _sumBy(resultado, 'u')


            if (usuarios > 0 && sesiones > 0) {
                salida.push(
                    { rango: rangos[i].rango, sesiones, usuarios }
                )
            }


        }


        setDatoGenero(datos)
        setGeneroDatos(salida)

    }, [datosGenero, year, mes, rangos])
    const size = datoGenero.length;
    return (
        <>
            <div className='bg-pink-700 p-8'>
                <span>YEAR:  {year} </span>
                <span>MES:  {mes} </span>
                CajaEdades - SIZE: {size} -TIPO:  {tipo}
            </div>
            <pre>
                {JSON.stringify(generoDatos, undefined, 2)}
            </pre>
        </>
    )
}

export default CajaGenero