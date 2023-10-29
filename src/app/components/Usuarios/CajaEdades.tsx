import { DatoEdades, Edades } from '@/models/MetricasApi'
import React, { useEffect, useState } from 'react'
import _groupBy from "lodash/groupBy";
import _each from "lodash/each";
import _sumBy from "lodash/sumBy";
import { rangosEdad } from '@/utils/baseData';
import Dona from '../charts/Dona';

interface Props {
    datosEdades: Edades[];
    tipo: string,
    mes: number,
    year: number
}

const CajaEdades = ({ datosEdades, year, mes, tipo }: Props) => {

    const [datosEdad, setDatosEdad] = useState(datosEdades);
    const [edadDatos, setEdadDatos] = useState<DatoEdades[]>()
    const [labels, setLabels] = useState<string[]>([]);
    const [datos1, setDatos1] = useState<number[]>([]);


    const [datosGraphSesiones, setDatosGraphSesiones] = useState<{} | any[]>([]);


    const rangos = rangosEdad;


    useEffect(() => {
        const colores = ['#28b463 ', '#99DBD7', '#E3C567', '#00A69C', '#f4495d', '#94c1df']
        let datos = datosEdades;
        if (year > 0 && mes === 0) {
            datos = datos.filter(dato => dato.y === year)

        } else if (year > 0 && mes > 0) {
            datos = datos.filter(dato => dato.y === year)
            datos = datos.filter(dato => dato.m === mes)
        }


        let salida: DatoEdades[] = []
        let labels = [];
        let datos1 = [];

        let graphSesiones: [[string, number | string, {} | string | undefined]] = [["Edades", "Sesiones", { role: "style" }]];


        for (let i = 0; i < rangos.length; i++) {
            let resultado = datos.filter(dato => dato.r === rangos[i].rango)
            let sesiones = _sumBy(resultado, 's')


            if (sesiones > 0) {
                salida.push(
                    { rango: rangos[i].rango, sesiones }
                )
                labels.push(rangos[i].rango)
                datos1.push(sesiones)

                graphSesiones.push([rangos[i].rango, sesiones, colores[i]])

            }


        }


        setDatosGraphSesiones(graphSesiones)
        setLabels(labels)
        setDatos1(datos1)
        setDatosEdad(datos)
        setEdadDatos(salida)

    }, [datosEdades, year, mes, rangos])




    return (
        <>
            <Dona
                datos1={datos1}

                labels={labels}
                datosGraphSesiones={datosGraphSesiones}

                titulo={'Rangos de edades'}
                tipo={'barras'}
            />



        </>
    )
}

export default CajaEdades