import type { Adquisicion, DatoAdquis } from '@/models/MetricasApi'
import { rangosAdqui } from '@/utils/baseData';
import React, { useEffect, useState } from 'react'
import _sumBy from "lodash/sumBy";
import Dona from '../charts/Dona';

interface Props {
    datosAdqui: Adquisicion[],
    tipo: string,
    mes: number,
    year: number
}

const CajaAdqui = ({ datosAdqui, year, mes, tipo }: Props) => {
    const [datoAdqui, setDatoAdqui] = useState(datosAdqui);
    const [adquiDatos, setAdquiDatos] = useState<DatoAdquis[]>();
    const [labels, setLabels] = useState<string[]>([]);
    const [datos1, setDatos1] = useState<number[]>([]);
    const [datos2, setDatos2] = useState<number[]>([]);
    const [activo, setActivo] = useState('sesiones')
    const [datosGraphSesiones, setDatosGraphSesiones] = useState<{} | any[]>([]);
    const [datosGraphUsuarios, setDatosGraphUsuarios] = useState<{} | any[]>([]);

    const rangos = rangosAdqui;

    useEffect(() => {
        const colores = ['#28b463 ', '#99DBD7', '#E3C567', '#00A69C', '#f4495d', '#94c1df']
        let datos = datosAdqui;
        if (year > 0 && mes === 0) {
            datos = datos.filter(dato => dato.y === year)
        } else if (year > 0 && mes > 0) {
            datos = datos.filter(dato => dato.y === year)
            datos = datos.filter(dato => dato.m === mes)
        }
        let salida: DatoAdquis[] = []
        let labels = [];
        let datos1 = [];
        let datos2 = [];
        let graphSesiones: [[string, number | string, {} | string | undefined]] = [["Adquisición", "Valor", { role: "style" }]];

        let graphUsuarios: [[string, number | string, {} | string | undefined]] = [["Adquisición", "Valor", { role: "style" }]];

        for (let i = 0; i < rangos.length; i++) {
            let resultado = datos.filter(dato => dato.canal === rangos[i].rango)
            let sesiones = _sumBy(resultado, 's')
            let usuarios = _sumBy(resultado, 'u')
            if (usuarios > 0 && sesiones > 0) {
                salida.push(
                    { rango: rangos[i].rango, sesiones, usuarios }
                )
                labels.push(rangos[i].rango)
                datos1.push(sesiones)
                datos2.push(usuarios)
                graphSesiones.push([rangos[i].rango, sesiones, colores[i]])
                graphUsuarios.push([rangos[i].rango, usuarios, colores[i]])

            }
        }
        setDatosGraphSesiones(graphSesiones)
        setDatosGraphUsuarios(graphUsuarios)
        setLabels(labels)
        setDatos1(datos1)
        setDatos2(datos2)
        setDatoAdqui(datos)
        setAdquiDatos(salida)
    }, [datosAdqui, year, mes, rangos])

    const size = datoAdqui.length;

    return (
        <Dona
            datos1={datos1}
            datos2={datos2}
            labels={labels}
            datosGraphSesiones={datosGraphSesiones}
            datosGraphUsuarios={datosGraphUsuarios}
            titulo={'Adquisición'}
            tipo={'barras2'}
        />
    )
}

export default CajaAdqui