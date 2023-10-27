import type { Adquisicion, DatoAdquis } from '@/models/MetricasApi'
import { rangosAdqui } from '@/utils/baseData';
import React, { useEffect, useState } from 'react'
import _sumBy from "lodash/sumBy";

interface Props {
    datosAdqui: Adquisicion[],
    tipo: string,
    mes: number,
    year: number
}

const CajaAdqui = ({ datosAdqui, year, mes, tipo }: Props) => {
    const [datoAdqui, setDatoAdqui] = useState(datosAdqui);
    const [adquiDatos, setAdquiDatos] = useState<DatoAdquis[]>();
    const rangos = rangosAdqui;

    useEffect(() => {
        let datos = datosAdqui;
        if (year > 0 && mes === 0) {
            datos = datos.filter(dato => dato.y === year)
        } else if (year > 0 && mes > 0) {
            datos = datos.filter(dato => dato.y === year)
            datos = datos.filter(dato => dato.m === mes)
        }
        let salida: DatoAdquis[] = []
        for (let i = 0; i < rangos.length; i++) {
            let resultado = datos.filter(dato => dato.canal === rangos[i].rango)
            let sesiones = _sumBy(resultado, 's')
            let usuarios = _sumBy(resultado, 'u')
            if (usuarios > 0 && sesiones > 0) {
                salida.push(
                    { rango: rangos[i].rango, sesiones, usuarios }
                )
            }
        }
        setDatoAdqui(datos)
        setAdquiDatos(salida)
    }, [datosAdqui, year, mes, rangos])

    const size = datoAdqui.length;

    return (
        <>
            <div className='bg-purple-600 p-8'>
                <span>YEAR:  {year} </span>
                <span>MES:  {mes} </span>
                Caja Tech - SIZE: {size} -TIPO:  {tipo}
            </div>
            <pre>
                {JSON.stringify(adquiDatos, undefined, 2)}
            </pre>
        </>
    )
}

export default CajaAdqui