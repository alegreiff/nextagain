import { DatoTecno, Tecno } from '@/models/MetricasApi'
import { rangosTecno } from '@/utils/baseData'
import React, { useEffect, useState } from 'react'
import _sumBy from "lodash/sumBy";
import Dona from '../charts/Dona';

interface Props {
    datosTecno: Tecno[]
    tipo: string,
    mes: number,
    year: number
}

const CajaTecno = ({ datosTecno, year, mes, tipo }: Props) => {

    const [datoTecno, setDatoTecno] = useState(datosTecno);
    const [tecnoDatos, setTecnoDatos] = useState<DatoTecno[]>();

    const [labels, setLabels] = useState<string[]>([]);
    const [datos1, setDatos1] = useState<number[]>([]);
    const [datos2, setDatos2] = useState<number[]>([]);

    const [datosGraphSesiones, setDatosGraphSesiones] = useState<{} | any[]>([]);
    const [datosGraphUsuarios, setDatosGraphUsuarios] = useState<{} | any[]>([]);


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

        let labels = [];
        let datos1 = [];
        let datos2 = [];
        let graphSesiones: [[string, number | string]] = [["Tecnología", "sesiones"]];
        let graphUsuarios: [[string, number | string]] = [["Tecnología", "usuarios"]];


        for (let i = 0; i < rangos.length; i++) {
            let resultado = datos.filter(dato => dato.tecno === rangos[i].rango)
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
        setDatoTecno(datos)
        setTecnoDatos(salida)
    }, [datosTecno, year, mes, rangos])

    const size = datoTecno.length;
    return (
        <Dona
            datos1={datos1}
            datos2={datos2}
            labels={labels}
            datosGraphSesiones={datosGraphSesiones}
            datosGraphUsuarios={datosGraphUsuarios}
            titulo={'Tecnología'}
            tipo={'pie'}
        />
    )
}

export default CajaTecno