import { DatoEdades, Edades } from '@/models/MetricasApi'
import React, { useEffect, useState } from 'react'
import _groupBy from "lodash/groupBy";
import _each from "lodash/each";
import _sumBy from "lodash/sumBy";
import { rangosEdad } from '@/utils/baseData';

interface Props {
    datosEdades: Edades[];
    tipo: string,
    mes: number,
    year: number
}

const CajaEdades = ({ datosEdades, year, mes, tipo }: Props) => {

    const [datosEdad, setDatosEdad] = useState(datosEdades);
    const [edadDatos, setEdadDatos] = useState<DatoEdades[]>()
    const rangos = rangosEdad;

    useEffect(() => {
        let datos = datosEdades;
        if (year > 0 && mes === 0) {
            datos = datos.filter(dato => dato.y === year)

        } else if (year > 0 && mes > 0) {
            datos = datos.filter(dato => dato.y === year)
            datos = datos.filter(dato => dato.m === mes)
        }


        let salida: DatoEdades[] = []

        for (let i = 0; i < rangos.length; i++) {
            let resultado = datos.filter(dato => dato.r === rangos[i].rango)
            let sesiones = _sumBy(resultado, 's')


            if (sesiones > 0) {
                salida.push(
                    { rango: rangos[i].rango, sesiones }
                )
            }


        }


        setDatosEdad(datos)
        setEdadDatos(salida)

    }, [datosEdades, year, mes, rangos])


    const [first, setfirst] = useState(1)
    const size = datosEdad.length;
    return (
        <>

            <div className='bg-amber-300 p-8'>
                <span>YEAR:  {year} </span>
                <span>MES:  {mes} </span>
                CajaEdades - SIZE: {size} -TIPO:  {tipo}  - {first}
            </div>
            <pre>
                {JSON.stringify(edadDatos, undefined, 2)}
            </pre>

        </>
    )
}

export default CajaEdades