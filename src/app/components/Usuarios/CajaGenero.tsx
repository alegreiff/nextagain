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
    const [activo, setActivo] = useState('sesiones')
    const [datosGraphSesiones, setDatosGraphSesiones] = useState<{} | any[]>([]);
    const [datosGraphUsuarios, setDatosGraphUsuarios] = useState<{} | any[]>([]);

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
        let graphSesiones: [[string, number | string]] = [["Género", "sesiones"]];
        let graphUsuarios: [[string, number | string]] = [["Género", "usuarios"]];
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
                graphSesiones.push([rangos[i].rango, sesiones])
                graphUsuarios.push([rangos[i].rango, usuarios])

            }


        }
        setDatosGraphSesiones(graphSesiones)
        setDatosGraphUsuarios(graphUsuarios)
        setLabels(labels)
        setDatos1(datos1)
        setDatos2(datos2)
        setDatoGenero(datos)
        setGeneroDatos(salida)
    }, [datosGenero, year, mes, rangos])

    //console.log(datos1, datos2)

    /* const cambia = () => {
        if (activo === 'sesiones') {
            setActivo('usuarios')
        } else {
            setActivo('sesiones')
        }

    } */


    //const size = datoGenero.length;
    return (

        <Dona
            datos1={datos1}
            datos2={datos2}
            labels={labels}
            datosGraphSesiones={datosGraphSesiones}
            datosGraphUsuarios={datosGraphUsuarios}
            titulo={'Género'}
        />

    )
}

export default CajaGenero