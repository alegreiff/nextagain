import { DatoGenero, Genero } from '@/models/MetricasApi'
import { rangosGenero } from '@/utils/baseData'
import React, { useEffect, useState } from 'react'
import _sumBy from "lodash/sumBy";
import Dona from '../charts/Dona';


interface Props {
    datosGenero: Genero[]
    tipo: string,
    mes: number,
    year: number
}

const CajaGenero = ({ datosGenero, year, mes, tipo }: Props) => {

    const [datoGenero, setDatoGenero] = useState(datosGenero);
    const [generoDatos, setGeneroDatos] = useState<DatoGenero[]>();
    const [labels, setLabels] = useState<string[]>([]);
    const [datos1, setDatos1] = useState<number[]>([]);
    const [datos2, setDatos2] = useState<number[]>([]);


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
        let labels = [];
        let datos1 = [];
        let datos2 = [];
        for (let i = 0; i < rangos.length; i++) {
            let resultado = datos.filter(dato => dato.genero === rangos[i].rango)
            let sesiones = _sumBy(resultado, 's')
            let usuarios = _sumBy(resultado, 'u')
            if (usuarios > 0 && sesiones > 0) {
                salida.push(
                    { rango: rangos[i].rango, sesiones, usuarios }
                )
                labels.push(rangos[i].rango)
                datos1.push(sesiones)
                datos2.push(usuarios)

            }


        }
        setLabels(labels)
        setDatos1(datos1)
        setDatos2(datos2)
        setDatoGenero(datos)
        setGeneroDatos(salida)
    }, [datosGenero, year, mes, rangos])

    console.log(datos1, datos2)





    const size = datoGenero.length;
    return (
        <>
            {/* <div className='bg-pink-700 p-8'>
                <span>YEAR:  {year} </span>
                <span>MES:  {mes} </span>
                Caja Gender - SIZE: {size} -TIPO:  {tipo}
            </div>
            <pre>
                {JSON.stringify(generoDatos, undefined, 2)}
            </pre> */}

            <Dona datos1={datos1} datos2={datos2} labels={labels} />

        </>
    )
}

export default CajaGenero