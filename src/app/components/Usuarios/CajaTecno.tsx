import { DatoTecno, Tecno } from '@/models/MetricasApi'
import { rangosTecno } from '@/utils/baseData'
import React, { useEffect, useState } from 'react'
import _sumBy from "lodash/sumBy";

interface Props {
    datosTecno: Tecno[]
    tipo: string,
    mes: number,
    year: number
}

const CajaTecno = ({ datosTecno, year, mes, tipo }: Props) => {

    const [datoTecno, setDatoTecno] = useState(datosTecno);
    const [tecnoDatos, setTecnoDatos] = useState<DatoTecno[]>();
    const rangos = rangosTecno;
    useEffect(() => {
        let datos = datosTecno;
        if (year > 0 && mes === 0) {
            datos = datos.filter(dato => dato.y === year)
        } else if (year > 0 && mes > 0) {
            datos = datos.filter(dato => dato.y === year)
            datos = datos.filter(dato => dato.m === mes)
        }
        let salida: DatoTecno[] = []
        for (let i = 0; i < rangos.length; i++) {
            let resultado = datos.filter(dato => dato.tecno === rangos[i].rango)
            let sesiones = _sumBy(resultado, 's')
            let usuarios = _sumBy(resultado, 'u')
            if (usuarios > 0 && sesiones > 0) {
                salida.push(
                    { rango: rangos[i].rango, sesiones, usuarios }
                )
            }
        }
        setDatoTecno(datos)
        setTecnoDatos(salida)
    }, [datosTecno, year, mes, rangos])

    const size = datoTecno.length;
    return (
        <>
            <div className='bg-teal-700 p-8'>
                <span>YEAR:  {year} </span>
                <span>MES:  {mes} </span>
                Caja Tecnología - SIZE: {size} -TIPO:  {tipo}
            </div>
            <pre>
                {JSON.stringify(tecnoDatos, undefined, 2)}
            </pre>
        </>
    )
}

export default CajaTecno